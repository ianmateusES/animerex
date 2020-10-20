import { Router } from 'express';
import SearchController from '../app/controllers/SearchController';

// http://localhost:3333/searchs
const searchRouter = Router();

searchRouter.get('/', SearchController.show);
searchRouter.get('/:user_id', SearchController.index);

export default searchRouter;
