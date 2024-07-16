const express = require('express');
const UserController = require('./userController');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/profile', auth, UserController.getUserProfile);
router.post('/logout', auth, UserController.logout);

module.exports = router;