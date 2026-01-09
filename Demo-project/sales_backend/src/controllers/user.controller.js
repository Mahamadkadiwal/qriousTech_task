const User = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = asyncHandler(async(req, res) => {
    const {username, email, role} = req.body;
    let {password} = req.body;

    password = await bcrypt.hash(password, 10);

    const user = await User.create({username, email, password, role});

    res.status(201).json({
        message: 'user registered successfully',
        data:{
            user
        }
    })
})

exports.loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({
        where: {email: email.trim()}
    });

    if(!user) {
        res.status(404).json({
            message: 'Invalid email and password'
        });
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if(!validatePassword){
        res.status(404).json({
            message: 'Invalid email and password'
        });
    }

    const token = jwt.sign({
        userId: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role   
    }, process.env.JWT_SECRET, {expiresIn: '1h'});

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict', 
        maxAge: 3600000, // 1 hour
        path: '/'
    }

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
        message: 'Login successfully',
        data: {
            userId: user.user_id,
            username: user.username,
            email: user.email,
            role: user.role
        },
        token: token
    })
})

exports.getUsers = asyncHandler(async(req, res) => {
    const users = await User.findAll();
    res.status(200).json({
        data: users
    })
})

exports.forgotPassword = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({
        where: {
            email
        }
    })

    if(!user){
        res.status(404).json({
            message: 'user not found'
        })
    }

    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    await user.save();

    res.status(200).json({
        message: 'Password udpated successfully',
        data: {
            userId: user.user_id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    })
}) 