const Router = require('express').Router;
const UserController = require('../controllers/UserController');

const userRouter = Router();
const userController = new UserController();

userRouter.post('/', userController.create);

userRouter.get('/:id', userController.getById);

userRouter.get('/email/:email', userController.getByEmail);

userRouter.get('/', userController.getAll);

userRouter.put('/:id', userController.update);

userRouter.delete('/:id', userController.remove);

userRouter.post('/login', userController.login);

module.exports = userRouter;



