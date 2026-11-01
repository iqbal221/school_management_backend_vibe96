import express from 'express';
import { NoticeController } from './notice.controller';

const router = express.Router();

router.post('/', NoticeController.createNotice);

router.get('/', NoticeController.getNotice);

router.get('/:id', NoticeController.getNoticeById);

router.put('/:id', NoticeController.updateNotice);

router.delete('/:id', NoticeController.deleteNotice);

export const NoticeRoutes = router;
