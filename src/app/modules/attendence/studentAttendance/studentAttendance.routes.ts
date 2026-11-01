import express from 'express';

import {
  StudentAttendanceController,
} from './studentAttendance.controller';

const router = express.Router();


// CREATE
router.post(
  '/',
  StudentAttendanceController.createStudentAttendance
);


// GET ALL
router.get(
  '/',
  StudentAttendanceController.getAllStudentAttendance
);


// GET STUDENT HISTORY
router.get(
  '/student/:studentId/history',
  StudentAttendanceController.getStudentAttendanceHistory
);


// GET SINGLE
router.get(
  '/:id',
  StudentAttendanceController.getStudentAttendanceById
);


// UPDATE
router.patch(
  '/:id',
  StudentAttendanceController.updateStudentAttendance
);


// DELETE
router.delete(
  '/:id',
  StudentAttendanceController.deleteStudentAttendance
);


export const StudentAttendanceRoutes = router;