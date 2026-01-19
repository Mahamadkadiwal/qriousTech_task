const userModel = require("../models/user.model");
const RefreshToken = require("../models/refreshToken.model");
const userService = require("../services/user.service");
const {generateAuthToken, generateRefreshToken, hashToken} = require('../utils/token');

module.exports.registerUser = async(req, res, next) => {
    const {username, email, password, role} = req.body;

    const isUserExist = await userModel.findOne({email});

    if(isUserExist){
        return res.status(400).json({
            message: 'User already exist'
        });
    }

    const hashPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        username,
        email,
        password: hashPassword,
        role
    });

    const token = generateAuthToken(user._id);
    const refreshToken = generateRefreshToken();

    await RefreshToken.create({
      userId: user._id,
      tokenHash: hashToken(refreshToken),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });

    res
       .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge:  30 * 24 * 60 * 60 * 1000
       })
       .status(201)
       .json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,

        }
       });   
}

module.exports.loginUser = async(req, res, next) => {
    const {email, password} = req.body;

    const user = await userModel.findOne({email}).select('+password');

    if(!user || !(await  user.comparePassword(password))){
        return res.status(401).json({
            message: 'Invalid email and password'
        });
    }

    const accessToken = generateAuthToken(user._id);
    const refreshToken = generateRefreshToken();

    await RefreshToken.create({
      userId: user._id,
      tokenHash: hashToken(refreshToken),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });

     res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000
    })
    .json({ accessToken });
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "username, email, and password are required"
      });
    }

    const hashPassword = await userModel.hashPassword(password);

    const user = await userService.updateUser(id, {
      username,
      email,
      password: hashPassword
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });

  } catch (error) {
    next(error);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    await userService.deleteUser(id);

    return res.status(200).json({
      message: "User deleted successfully",
    });
};

exports.logout = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (token) {
    await RefreshToken.deleteOne({
      tokenHash: hashToken(token)
    });
  }

  res.clearCookie("refreshToken").json({
    message: "Logged out successfully"
  });
};