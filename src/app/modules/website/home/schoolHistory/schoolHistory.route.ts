import express from 'express';
import { SchoolHistoryController } from './schoolHistory.contoller';


const router = express.Router();

router.post(
  '/',
  SchoolHistoryController.createSchoolHistory
);
router.get(
  '/',
  SchoolHistoryController.getSchoolHistory
);

router.put(
  '/',
  SchoolHistoryController.updateSchoolHistory
);

export const SchoolHistoryRoutes = router;