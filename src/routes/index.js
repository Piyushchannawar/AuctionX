const express = require('express');
const authRouter = require('./auth');

const indexRouter = express.Router();

indexRouter.use('/auth', authRouter);


module.exports = indexRouter;