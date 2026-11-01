"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const attendence_controller_1 = require("./attendence.controller");
const router = express_1.default.Router();
router.post('/student', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), attendence_controller_1.AttendanceController.InsertStudentAttedanceIntoDB);
router.post('/teacher', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), attendence_controller_1.AttendanceController.InsertTeacherAttedanceIntoDB);
router.post('/official', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), attendence_controller_1.AttendanceController.InsertOfficialAttedanceIntoDB);
router.get('/student', attendence_controller_1.AttendanceController.GetStudentAttedanceFromDB);
router.get('/teacher', attendence_controller_1.AttendanceController.GetTeacherAttedanceFromDB);
router.get('/official', attendence_controller_1.AttendanceController.GetOfficialAttedanceFromDB);
exports.AttendanceRoutes = router;
