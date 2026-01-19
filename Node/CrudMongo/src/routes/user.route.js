const { registerUser, loginUser, updateUser, deleteUser } = require("../controllers/user.controller");
const { refreshToken } = require('../controllers/auth.controller'); 
const express = require('express');
const { authUser } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/:id',authUser, updateUser);
router.delete('/:id', deleteUser);
router.post('/refresh-token', refreshToken);

module.exports = router;