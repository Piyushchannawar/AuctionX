const express = require('express');
const authController = require('../controllers/auth/index')
const authRouter = express.Router();


authRouter.post('/register', authController.registerUser);




module.exports = authRouter;