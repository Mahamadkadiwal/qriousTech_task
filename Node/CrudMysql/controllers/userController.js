const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../models/userModel");
const asyncHandler = require("../utils/asyncHandler");

exports.getUserData = asyncHandler(async (req, res) => {
  const users = await getUser();
  return res.json(users);
});

exports.createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if ((!username || !email, !password)) {
    res.status(400).json({ message: "All fields are required" });
  }
  const user = await createUser(req.body);

  res.status(201).json({
    message: "user created successfully",
    user,
  });
});

exports.updateUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if ((!username || !email, !password)) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const user = await updateUser(req.params.id, req.body);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  return res.status(200).json({
    message: "user updated successfully",
    user,
  });
});

exports.deleteUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "User Id is required",
      });
    }

    const user = await deleteUser(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "user deleted successfully",
      user,
    });
  
});
