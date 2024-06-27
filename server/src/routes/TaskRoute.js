const Router = require('express').Router;
const TaskController = require('../controllers/TaskController');

const taskRouter = Router();
const taskController = new TaskController();

taskRouter.post('/', taskController.create);

taskRouter.get('/:id', taskController.getById);

taskRouter.get('/user/:id', taskController.getAllByUserId);

taskRouter.put('/:id', taskController.update);

taskRouter.delete('/:id', taskController.remove);

module.exports = taskRouter;