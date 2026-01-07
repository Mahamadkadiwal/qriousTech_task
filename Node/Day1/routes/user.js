const express = require('express');
const { getUser, postUser, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

router.get('/getUser', getUser);
router.post('/postUser', postUser);
router.put('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);

module.exports = router;
