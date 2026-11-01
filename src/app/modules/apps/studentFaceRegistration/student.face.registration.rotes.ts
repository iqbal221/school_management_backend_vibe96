
import { NextFunction, Request, Response, Router } from 'express';
import { FileUploadHelper } from '../../../../helpers/FileUploadHelper';

import { ENUM_USER_ROLE } from '../../../../enums/user';
import auth from '../../../middlewares/auth';
import { StudentController } from '../../student/student.controller';
import { StudentFaceRegistrationController } from './student.face.registration.controller';

const router = Router();



// Register or update a student's face.
router.post(
  '/',

  FileUploadHelper.upload.array('faceImage', 4),
  (req: Request, res: Response, next: NextFunction) => {
    StudentFaceRegistrationController.RegisterStudentFace(req, res, next);
  }
);

router.get('/result', StudentFaceRegistrationController.GetStudentFace);
router.get('/:id', StudentController.GetDataById);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  StudentController.UpdateIntoDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  StudentFaceRegistrationController.DeleteStudentFace
);
router.get('/', StudentController.GetAllFromDB);

export const StudentFaceRegistrationRoutes = router;
