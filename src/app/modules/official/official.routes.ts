import express, { NextFunction, Request, Response } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OfficialController } from './official.controller';
import { OfficialValidation } from './official.validation';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  FileUploadHelper.upload.array('file', 4),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = OfficialValidation.create.parse(JSON.parse(req.body.data));
    return OfficialController.InsertIntoDB(req, res, next);
  }
);

router.get('/:id', OfficialController.GetDataById);
router.patch(
  '/:id',
  validateRequest(OfficialValidation.update),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OfficialController.UpdateIntoDB
);
router.delete(
  '/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OfficialController.DeleteFromDB
);
router.get('/', OfficialController.GetAllFromDB);

export const OfficialRoutes = router;
