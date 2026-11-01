import express, { NextFunction, Request, Response } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import { TeacherController } from './teacher.controller';
import { TeacherValidation } from './teacher.validation';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  FileUploadHelper.upload.array('file', 4),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body.data);
    req.body = TeacherValidation.create.parse(JSON.parse(req.body.data));
    return TeacherController.InsertIntoDB(req, res, next);
  }
);

router.get('/:id', TeacherController.GetDataById);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  TeacherController.UpdateIntoDB
);
router.delete(
  '/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  TeacherController.DeleteFromDB
);
router.get('/', TeacherController.GetAllFromDB);

export const TeacherRoutes = router;
