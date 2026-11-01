import express, { NextFunction, Request, Response } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';

const router = express.Router();

router.post(
  '/result',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  StudentController.UploadResult
);
router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  FileUploadHelper.upload.array('file', 4),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = StudentValidation.create.parse(JSON.parse(req.body.data));
    console.log('req.body', req.body);
    return StudentController.InsertIntoDB(req, res, next);
  }
);

router.get('/result', StudentController.GetStudentResult);
router.get('/:id', StudentController.GetDataById);
router.patch(
  '/:id',
   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  FileUploadHelper.upload.array('file', 4),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = StudentValidation.update.parse(JSON.parse(req.body.data));
    console.log('req.body', req.body);
    return StudentController.UpdateIntoDB(req, res, next);
  }
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  StudentController.DeleteFromDB
);
router.get('/', StudentController.GetAllFromDB);

export const StudentRoutes = router;
