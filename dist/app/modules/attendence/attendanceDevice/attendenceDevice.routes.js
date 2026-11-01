"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const attendenceDevice_controller_1 = require("./attendenceDevice.controller");
const router = express_1.default.Router();
// =========================================================
// CREATE
// =========================================================
router.post("/", attendenceDevice_controller_1.AttendanceDeviceController
    .createAttendanceDevice);
// =========================================================
// HEARTBEAT
// =========================================================
router.post("/heartbeat", attendenceDevice_controller_1.AttendanceDeviceController
    .attendanceDeviceHeartbeat);
// =========================================================
// ACTIVE DEVICES
// IMPORTANT: Keep this BEFORE /:id
// =========================================================
router.get("/active", attendenceDevice_controller_1.AttendanceDeviceController
    .getActiveAttendanceDevices);
// =========================================================
// GET BY DEVICE CODE
// =========================================================
router.get("/code/:deviceCode", attendenceDevice_controller_1.AttendanceDeviceController
    .getAttendanceDeviceByDeviceCode);
// =========================================================
// GET ALL
// =========================================================
router.get("/", attendenceDevice_controller_1.AttendanceDeviceController
    .getAllAttendanceDevices);
// =========================================================
// GET BY ID
// =========================================================
router.get("/:id", attendenceDevice_controller_1.AttendanceDeviceController
    .getAttendanceDeviceById);
// =========================================================
// UPDATE
// =========================================================
router.patch("/:id", attendenceDevice_controller_1.AttendanceDeviceController
    .updateAttendanceDevice);
// =========================================================
// ACTIVATE
// =========================================================
router.patch("/:id/activate", attendenceDevice_controller_1.AttendanceDeviceController
    .activateAttendanceDevice);
// =========================================================
// DEACTIVATE
// =========================================================
router.patch("/:id/deactivate", attendenceDevice_controller_1.AttendanceDeviceController
    .deactivateAttendanceDevice);
// =========================================================
// DELETE
// =========================================================
router.delete("/:id", attendenceDevice_controller_1.AttendanceDeviceController
    .deleteAttendanceDevice);
exports.default = router;
