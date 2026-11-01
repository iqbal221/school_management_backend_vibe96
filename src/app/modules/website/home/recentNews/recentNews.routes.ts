import express from 'express';
import { RecentNewsController } from './recentNews.controller';

const router = express.Router();

router.post('/', RecentNewsController.createRecentNews);

router.get('/', RecentNewsController.getRecentNews);

router.get('/:id', RecentNewsController.getRecentNewsById);

router.patch('/:id', RecentNewsController.updateRecentNews);

router.delete('/:id', RecentNewsController.deleteRecentNews);

export const RecentNewsRoutes = router;
