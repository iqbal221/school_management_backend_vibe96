"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentAttendanceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const studentAttendance_controller_1 = require("./studentAttendance.controller");
const router = express_1.default.Router();
// CREATE
router.post('/', studentAttendance_controller_1.StudentAttendanceController.createStudentAttendance);
// GET ALL
router.get('/', studentAttendance_controller_1.StudentAttendanceController.getAllStudentAttendance);
// GET STUDENT HISTORY
router.get('/student/:studentId/history', studentAttendance_controller_1.StudentAttendanceController.getStudentAttendanceHistory);
// GET SINGLE
router.get('/:id', studentAttendance_controller_1.StudentAttendanceController.getStudentAttendanceById);
// UPDATE
router.patch('/:id', studentAttendance_controller_1.StudentAttendanceController.updateStudentAttendance);
// DELETE
router.delete('/:id', studentAttendance_controller_1.StudentAttendanceController.deleteStudentAttendance);
exports.StudentAttendanceRoutes = router;
