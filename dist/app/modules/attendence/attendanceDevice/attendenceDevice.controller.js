"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceDeviceController = void 0;
const catchAsync_1 = __importDefault(require("../../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../../shared/sendResponse"));
const attendenceDevice_service_1 = require("./attendenceDevice.service");
// =========================================================
// CREATE
// =========================================================
const createAttendanceDevice = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield attendenceDevice_service_1.AttendanceDeviceService
        .createAttendanceDevice(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Attendance device created successfully",
        data: result,
    });
}));
// =========================================================
// GET ALL
// =========================================================
const getAllAttendanceDevices = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, type, isActive, schoolId, } = req.query;
    let activeValue;
    if (isActive !== undefined) {
        activeValue =
            String(isActive) === "true";
    }
    const result = yield attendenceDevice_service_1.AttendanceDeviceService
        .getAllAttendanceDevices({
        searchTerm: searchTerm,
        type: type,
        isActive: activeValue,
        schoolId: schoolId,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Attendance devices retrieved successfully",
        data: result,
    });
}));
// =========================================================
// GET ACTIVE DEVICES
// =========================================================
const getActiveAttendanceDevices = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { schoolId, } = req.query;
    const result = yield attendenceDevice_service_1.AttendanceDeviceService
        .getActiveAttendanceDevices(schoolId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Active attendance devices retrieved successfully",
        data: result,
    });
}));
// =========================================================
// GET BY ID
// =========================================================
const getAttendanceDeviceById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield attendenceDevice_service_1.AttendanceDeviceService
        .getAttendanceDeviceById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Attendance device retrieved successfully",
        data: result,
    });
}));
// =========================================================
// GET BY DEVICE CODE
// =========================================================
const getAttendanceDeviceByDeviceCode = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { deviceCode, } = req.params;
    const result = yield attendenceDevice_service_1.AttendanceDeviceService
        .getAttendanceDeviceByDeviceCode(deviceCode);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Attendance device retrieved successfully",
        data: result,
    });
}));
// =========================================================
// UPDATE
// =========================================================
const updateAttendanceDevice = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield attendenceDevice_service_1.AttendanceDeviceService
        .updateAttendanceDevice(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Attendance device updated successfully",
        data: result,
    });
}));
// =========================================================
// DELETE
// =========================================================
const deleteAttendanceDevice = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield attendenceDevice_service_1.AttendanceDeviceService
        .deleteAttendanceDevice(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Attendance device deleted successfully",
        data: result,
    });
}));
// =========================================================
// ACTIVATE
// =========================================================
const activateAttendanceDevice = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield attendenceDevice_service_1.AttendanceDeviceService
        .activateAttendanceDevice(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Attendance device activated successfully",
        data: result,
    });
}));
// =========================================================
// DEACTIVATE
// =========================================================
const deactivateAttendanceDevice = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield attendenceDevice_service_1.AttendanceDeviceService
        .deactivateAttendanceDevice(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Attendance device deactivated successfully",
        data: result,
    });
}));
// =========================================================
// HEARTBEAT
// =========================================================
const attendanceDeviceHeartbeat = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { deviceCode, } = req.body;
    const result = yield attendenceDevice_service_1.AttendanceDeviceService
        .attendanceDeviceHeartbeat(deviceCode);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Attendance device heartbeat updated successfully",
        data: result,
    });
}));
// =========================================================
// EXPORT
// =========================================================
exports.AttendanceDeviceController = {
    createAttendanceDevice,
    getAllAttendanceDevices,
    getActiveAttendanceDevices,
    getAttendanceDeviceById,
    getAttendanceDeviceByDeviceCode,
    updateAttendanceDevice,
    deleteAttendanceDevice,
    activateAttendanceDevice,
    deactivateAttendanceDevice,
    attendanceDeviceHeartbeat,
};
