import { Router } from 'express';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import animesRouter from './animes.routes';
import searchsRouter from './searchs.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/animes', animesRouter);
routes.use('/searchs', searchsRouter);

export default routes;
