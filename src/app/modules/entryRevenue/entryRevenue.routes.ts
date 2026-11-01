import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { EntryRevenueController } from './entryRevenue.controller';
import { EntryRevenueValidation } from './entryRevenue.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(EntryRevenueValidation.create),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  EntryRevenueController.InsertIntoDB
);

router.get('/:id', EntryRevenueController.GetDataById);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  EntryRevenueController.DeleteFromDB
);

router.get('/', EntryRevenueController.GetAllFromDB);

export const RevenueRoutes = router;
