import express from "express";

import {
  AttendanceDeviceController,
} from "./attendenceDevice.controller";

const router = express.Router();

// =========================================================
// CREATE
// =========================================================

router.post(
  "/",
  AttendanceDeviceController
    .createAttendanceDevice
);

// =========================================================
// HEARTBEAT
// =========================================================

router.post(
  "/heartbeat",
  AttendanceDeviceController
    .attendanceDeviceHeartbeat
);

// =========================================================
// ACTIVE DEVICES
// IMPORTANT: Keep this BEFORE /:id
// =========================================================

router.get(
  "/active",
  AttendanceDeviceController
    .getActiveAttendanceDevices
);

// =========================================================
// GET BY DEVICE CODE
// =========================================================

router.get(
  "/code/:deviceCode",
  AttendanceDeviceController
    .getAttendanceDeviceByDeviceCode
);

// =========================================================
// GET ALL
// =========================================================

router.get(
  "/",
  AttendanceDeviceController
    .getAllAttendanceDevices
);

// =========================================================
// GET BY ID
// =========================================================

router.get(
  "/:id",
  AttendanceDeviceController
    .getAttendanceDeviceById
);

// =========================================================
// UPDATE
// =========================================================

router.patch(
  "/:id",
  AttendanceDeviceController
    .updateAttendanceDevice
);

// =========================================================
// ACTIVATE
// =========================================================

router.patch(
  "/:id/activate",
  AttendanceDeviceController
    .activateAttendanceDevice
);

// =========================================================
// DEACTIVATE
// =========================================================

router.patch(
  "/:id/deactivate",
  AttendanceDeviceController
    .deactivateAttendanceDevice
);

// =========================================================
// DELETE
// =========================================================

router.delete(
  "/:id",
  AttendanceDeviceController
    .deleteAttendanceDevice
);

export default router;