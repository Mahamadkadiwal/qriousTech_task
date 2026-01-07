const express = require('express');
const { getUserData, createUser, updateUser, deleteUser } = require('../controllers/userController');

const router = express();

router.get('/getUser', getUserData);
router.post('/postUser', createUser);
router.put('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);

module.exports = router;