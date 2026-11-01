import express from "express";

import {
  OfficialAttendanceController,
} from "./officialAttendance.controller";

const router = express.Router();

// =========================================================
// CREATE
// =========================================================

router.post(
  "/",
  OfficialAttendanceController
    .createOfficialAttendance
);

// =========================================================
// CHECK-IN
// =========================================================

router.post(
  "/check-in",
  OfficialAttendanceController
    .officialCheckIn
);

// =========================================================
// CHECK-OUT
// =========================================================

router.post(
  "/check-out",
  OfficialAttendanceController
    .officialCheckOut
);

// =========================================================
// GET ALL
// =========================================================

router.get(
  "/",
  OfficialAttendanceController
    .getAllOfficialAttendance
);

// =========================================================
// OFFICIAL HISTORY
// =========================================================

router.get(
  "/official/:officialId/history",
  OfficialAttendanceController
    .getOfficialAttendanceHistory
);

// =========================================================
// GET SINGLE
// =========================================================

router.get(
  "/:id",
  OfficialAttendanceController
    .getOfficialAttendanceById
);

// =========================================================
// UPDATE
// =========================================================

router.patch(
  "/:id",
  OfficialAttendanceController
    .updateOfficialAttendance
);

// =========================================================
// DELETE
// =========================================================

router.delete(
  "/:id",
  OfficialAttendanceController
    .deleteOfficialAttendance
);

const OfficialAttendanceRoutes = router;
export default OfficialAttendanceRoutes;