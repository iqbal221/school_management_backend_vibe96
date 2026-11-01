"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teacherAttendance_controller_1 = require("./teacherAttendance.controller");
const router = express_1.default.Router();
// =========================================================
// CREATE
// =========================================================
router.post("/", teacherAttendance_controller_1.TeacherAttendanceController.createTeacherAttendance);
// =========================================================
// CHECK-IN
// =========================================================
router.post("/check-in", teacherAttendance_controller_1.TeacherAttendanceController.teacherCheckIn);
// =========================================================
// CHECK-OUT
// =========================================================
router.post("/check-out", teacherAttendance_controller_1.TeacherAttendanceController.teacherCheckOut);
// =========================================================
// GET ALL
// =========================================================
router.get("/", teacherAttendance_controller_1.TeacherAttendanceController.getAllTeacherAttendance);
// =========================================================
// TEACHER HISTORY
// =========================================================
router.get("/teacher/:teacherId/history", teacherAttendance_controller_1.TeacherAttendanceController.getTeacherAttendanceHistory);
// =========================================================
// GET SINGLE
// =========================================================
router.get("/:id", teacherAttendance_controller_1.TeacherAttendanceController.getTeacherAttendanceById);
// =========================================================
// UPDATE
// =========================================================
router.patch("/:id", teacherAttendance_controller_1.TeacherAttendanceController.updateTeacherAttendance);
// =========================================================
// DELETE
// =========================================================
router.delete("/:id", teacherAttendance_controller_1.TeacherAttendanceController.deleteTeacherAttendance);
const TeacherAttendanceRoutes = router;
exports.default = TeacherAttendanceRoutes;
