import express from "express";
import { TeacherAttendanceController } from "./teacherAttendance.controller";

const router = express.Router();

// =========================================================
// CREATE
// =========================================================

router.post(
  "/",
  TeacherAttendanceController.createTeacherAttendance
);

// =========================================================
// CHECK-IN
// =========================================================

router.post(
  "/check-in",
  TeacherAttendanceController.teacherCheckIn
);

// =========================================================
// CHECK-OUT
// =========================================================

router.post(
  "/check-out",
  TeacherAttendanceController.teacherCheckOut
);

// =========================================================
// GET ALL
// =========================================================

router.get(
  "/",
  TeacherAttendanceController.getAllTeacherAttendance
);

// =========================================================
// TEACHER HISTORY
// =========================================================

router.get(
  "/teacher/:teacherId/history",
  TeacherAttendanceController.getTeacherAttendanceHistory
);

// =========================================================
// GET SINGLE
// =========================================================

router.get(
  "/:id",
  TeacherAttendanceController.getTeacherAttendanceById
);

// =========================================================
// UPDATE
// =========================================================

router.patch(
  "/:id",
  TeacherAttendanceController.updateTeacherAttendance
);

// =========================================================
// DELETE
// =========================================================

router.delete(
  "/:id",
  TeacherAttendanceController.deleteTeacherAttendance
);

const TeacherAttendanceRoutes = router;
export default TeacherAttendanceRoutes;