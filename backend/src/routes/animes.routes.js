import { Router } from 'express';
import AnimeController from '../app/controllers/AnimeController';
import ensureAuthenticated from '../app/middlewares/ensureAuthenticated';

// http://localhost:3333/animes
const animesRouter = Router();

animesRouter.post('/', ensureAuthenticated, AnimeController.store);
animesRouter.put('/:id', ensureAuthenticated, AnimeController.update);
animesRouter.get('/', ensureAuthenticated, AnimeController.show);
animesRouter.get('/:id', AnimeController.index);
animesRouter.delete('/:id', ensureAuthenticated, AnimeController.destroy);

export default animesRouter;
