import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { EntryFeesController } from './entryFees.controller';
import { EntryFeesValidation } from './entryFees.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(EntryFeesValidation.create),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  EntryFeesController.InsertIntoDB
);

router.post(
  '/authorization',
  validateRequest(EntryFeesValidation.createAuthorization),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  EntryFeesController.InsertAuthorizationIntoDB
);

router.get('/authorization', EntryFeesController.GetAuthorizationFromDB);
router.get('/:id', EntryFeesController.GetDataById);
router.patch(
  '/authorization/:id',
  validateRequest(EntryFeesValidation.updateAuthorization),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  EntryFeesController.UpdateAuthorizationIntoDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  EntryFeesController.DeleteFromDB
);

router.get('/', EntryFeesController.GetAllFromDB);

export const EntryFeesRoutes = router;
