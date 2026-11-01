"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const attendence_controller_1 = require("./attendence.controller");
const router = express_1.default.Router();
// =========================================================
// TODAY
// =========================================================
router.get("/:today", attendence_controller_1.AttendanceDashboardController
    .getTodayAttendance);
// =========================================================
// DASHBOARD
// =========================================================
router.get("/", attendence_controller_1.AttendanceDashboardController
    .getAttendanceDashboard);
const DashboardAttendanceRoutes = router;
exports.default = DashboardAttendanceRoutes;
