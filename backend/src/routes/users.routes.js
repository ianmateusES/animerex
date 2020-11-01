import { Router } from 'express';
import UserController from '../app/controllers/UserController';
import ensureAuthenticated from '../app/middlewares/ensureAuthenticated';

// http://localhost:3333/users
const usersRouter = Router();

usersRouter.post('/', UserController.store);
usersRouter.put('/', ensureAuthenticated, UserController.update);
usersRouter.delete('/:id', ensureAuthenticated, UserController.destroy);


export default usersRouter;
