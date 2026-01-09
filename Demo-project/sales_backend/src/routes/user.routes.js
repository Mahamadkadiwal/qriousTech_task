const { createUser, loginUser, getUsers, forgotPassword } = require("../controllers/user.controller");

const express = require('express');
const { userSchema, loginSchema } = require("../schema/userSchema");
const validate = require('../middlewares/validateMiddleware');
const { authUser } = require("../middlewares/authMiddleware");

const router = express();

router.post('/login', validate(loginSchema) ,loginUser);
router.post('/postUser',validate(userSchema) , createUser);
router.get('/getUsers', authUser, getUsers);
router.post('/udpatePassword', authUser, forgotPassword);

module.exports = router;