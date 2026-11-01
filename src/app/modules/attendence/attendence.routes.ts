import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { AttendanceController } from './attendence.controller';

const router = express.Router();

router.post(
  '/student',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AttendanceController.InsertStudentAttedanceIntoDB
);

router.post(
  '/teacher',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AttendanceController.InsertTeacherAttedanceIntoDB
);

router.post(
  '/official',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AttendanceController.InsertOfficialAttedanceIntoDB
)

router.get('/student', AttendanceController.GetStudentAttedanceFromDB);
router.get('/teacher', AttendanceController.GetTeacherAttedanceFromDB);
router.get('/official', AttendanceController.GetOfficialAttedanceFromDB);

export const AttendanceRoutes = router;
