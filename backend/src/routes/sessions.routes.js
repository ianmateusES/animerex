import { Router } from 'express';
import SessionController from '../app/controllers/SessionController';
import ensureAuthenticated from '../app/middlewares/ensureAuthenticated';

// http://localhost:3333/sessions
const sessionsRouter = Router();

sessionsRouter.post('/', SessionController.store);

export default sessionsRouter;
