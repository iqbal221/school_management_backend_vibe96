import express from "express";
import { AttendanceDashboardController } from "./attendence.controller";


const router = express.Router();

// =========================================================
// TODAY
// =========================================================

router.get(
  "/:today",
  AttendanceDashboardController
    .getTodayAttendance
);

// =========================================================
// DASHBOARD
// =========================================================

router.get(
  "/",
  AttendanceDashboardController
    .getAttendanceDashboard
);

const DashboardAttendanceRoutes = router;
export default DashboardAttendanceRoutes;