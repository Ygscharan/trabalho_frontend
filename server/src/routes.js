const express = require('express');

const userRouter = require('./routes/UserRoute');
const taskRouter = require('./routes/TaskRoute');

const Routes = express.Router();

Routes.use('/users', userRouter);
Routes.use('/tasks', taskRouter);

module.exports = Routes;