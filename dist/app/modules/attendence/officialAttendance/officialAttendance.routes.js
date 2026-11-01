"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const officialAttendance_controller_1 = require("./officialAttendance.controller");
const router = express_1.default.Router();
// =========================================================
// CREATE
// =========================================================
router.post("/", officialAttendance_controller_1.OfficialAttendanceController
    .createOfficialAttendance);
// =========================================================
// CHECK-IN
// =========================================================
router.post("/check-in", officialAttendance_controller_1.OfficialAttendanceController
    .officialCheckIn);
// =========================================================
// CHECK-OUT
// =========================================================
router.post("/check-out", officialAttendance_controller_1.OfficialAttendanceController
    .officialCheckOut);
// =========================================================
// GET ALL
// =========================================================
router.get("/", officialAttendance_controller_1.OfficialAttendanceController
    .getAllOfficialAttendance);
// =========================================================
// OFFICIAL HISTORY
// =========================================================
router.get("/official/:officialId/history", officialAttendance_controller_1.OfficialAttendanceController
    .getOfficialAttendanceHistory);
// =========================================================
// GET SINGLE
// =========================================================
router.get("/:id", officialAttendance_controller_1.OfficialAttendanceController
    .getOfficialAttendanceById);
// =========================================================
// UPDATE
// =========================================================
router.patch("/:id", officialAttendance_controller_1.OfficialAttendanceController
    .updateOfficialAttendance);
// =========================================================
// DELETE
// =========================================================
router.delete("/:id", officialAttendance_controller_1.OfficialAttendanceController
    .deleteOfficialAttendance);
const OfficialAttendanceRoutes = router;
exports.default = OfficialAttendanceRoutes;
