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
exports.OfficialAttendanceController = void 0;
const catchAsync_1 = __importDefault(require("../../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../../shared/sendResponse"));
const officialAttendance_service_1 = require("./officialAttendance.service");
// =========================================================
// CREATE
// =========================================================
const createOfficialAttendance = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield officialAttendance_service_1.OfficialAttendanceService
        .createOfficialAttendance(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Official attendance created successfully",
        data: result,
    });
}));
// =========================================================
// GET ALL
// =========================================================
const getAllOfficialAttendance = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { officialId, status, method, startDate, endDate, } = req.query;
    const result = yield officialAttendance_service_1.OfficialAttendanceService
        .getAllOfficialAttendance({
        officialId: officialId,
        status: status,
        method: method,
        startDate: startDate
            ? new Date(startDate)
            : undefined,
        endDate: endDate
            ? new Date(endDate)
            : undefined,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Official attendance retrieved successfully",
        data: result,
    });
}));
// =========================================================
// GET SINGLE
// =========================================================
const getOfficialAttendanceById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield officialAttendance_service_1.OfficialAttendanceService
        .getOfficialAttendanceById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Official attendance retrieved successfully",
        data: result,
    });
}));
// =========================================================
// GET HISTORY
// =========================================================
const getOfficialAttendanceHistory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { officialId, } = req.params;
    const { startDate, endDate, } = req.query;
    const result = yield officialAttendance_service_1.OfficialAttendanceService
        .getOfficialAttendanceHistory(officialId, startDate
        ? new Date(startDate)
        : undefined, endDate
        ? new Date(endDate)
        : undefined);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Official attendance history retrieved successfully",
        data: result,
    });
}));
// =========================================================
// UPDATE
// =========================================================
const updateOfficialAttendance = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield officialAttendance_service_1.OfficialAttendanceService
        .updateOfficialAttendance(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Official attendance updated successfully",
        data: result,
    });
}));
// =========================================================
// DELETE
// =========================================================
const deleteOfficialAttendance = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield officialAttendance_service_1.OfficialAttendanceService
        .deleteOfficialAttendance(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Official attendance deleted successfully",
        data: result,
    });
}));
// =========================================================
// CHECK-IN
// =========================================================
const officialCheckIn = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield officialAttendance_service_1.OfficialAttendanceService
        .officialCheckIn(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Official checked in successfully",
        data: result,
    });
}));
// =========================================================
// CHECK-OUT
// =========================================================
const officialCheckOut = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { officialId, } = req.body;
    const result = yield officialAttendance_service_1.OfficialAttendanceService
        .officialCheckOut(officialId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Official checked out successfully",
        data: result,
    });
}));
// =========================================================
// EXPORT
// =========================================================
exports.OfficialAttendanceController = {
    createOfficialAttendance,
    getAllOfficialAttendance,
    getOfficialAttendanceById,
    getOfficialAttendanceHistory,
    updateOfficialAttendance,
    deleteOfficialAttendance,
    officialCheckIn,
    officialCheckOut,
};
