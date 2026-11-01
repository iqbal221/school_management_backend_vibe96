import express from 'express';
import { NewsController } from './news.controller';

const router = express.Router();

router.post('/', NewsController.createNews);

router.get('/', NewsController.getNews);

router.get('/:id', NewsController.getNewsById);

router.put('/:id', NewsController.updateNews);

router.delete('/:id', NewsController.deleteNews);

export const NewsRoutes = router;

