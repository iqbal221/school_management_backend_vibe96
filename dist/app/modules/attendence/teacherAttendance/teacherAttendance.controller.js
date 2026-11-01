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
exports.TeacherAttendanceController = void 0;
const catchAsync_1 = __importDefault(require("../../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../../shared/sendResponse"));
const teacherAttendance_service_1 = require("./teacherAttendance.service");
// =========================================================
// CREATE
// =========================================================
const createTeacherAttendance = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield teacherAttendance_service_1.TeacherAttendanceService.createTeacherAttendance(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Teacher attendance created successfully",
        data: result,
    });
}));
// =========================================================
// GET ALL
// =========================================================
const getAllTeacherAttendance = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teacherId, status, method, startDate, endDate, } = req.query;
    const result = yield teacherAttendance_service_1.TeacherAttendanceService.getAllTeacherAttendance({
        teacherId: teacherId,
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
        message: "Teacher attendance retrieved successfully",
        data: result,
    });
}));
// =========================================================
// GET SINGLE
// =========================================================
const getTeacherAttendanceById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield teacherAttendance_service_1.TeacherAttendanceService.getTeacherAttendanceById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Teacher attendance retrieved successfully",
        data: result,
    });
}));
// =========================================================
// GET HISTORY
// =========================================================
const getTeacherAttendanceHistory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teacherId } = req.params;
    const { startDate, endDate } = req.query;
    const result = yield teacherAttendance_service_1.TeacherAttendanceService.getTeacherAttendanceHistory(teacherId, startDate
        ? new Date(startDate)
        : undefined, endDate
        ? new Date(endDate)
        : undefined);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Teacher attendance history retrieved successfully",
        data: result,
    });
}));
// =========================================================
// UPDATE
// =========================================================
const updateTeacherAttendance = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield teacherAttendance_service_1.TeacherAttendanceService.updateTeacherAttendance(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Teacher attendance updated successfully",
        data: result,
    });
}));
// =========================================================
// DELETE
// =========================================================
const deleteTeacherAttendance = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield teacherAttendance_service_1.TeacherAttendanceService.deleteTeacherAttendance(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Teacher attendance deleted successfully",
        data: result,
    });
}));
// =========================================================
// CHECK-IN
// =========================================================
const teacherCheckIn = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield teacherAttendance_service_1.TeacherAttendanceService.teacherCheckIn(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Teacher checked in successfully",
        data: result,
    });
}));
// =========================================================
// CHECK-OUT
// =========================================================
const teacherCheckOut = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teacherId } = req.body;
    const result = yield teacherAttendance_service_1.TeacherAttendanceService.teacherCheckOut(teacherId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Teacher checked out successfully",
        data: result,
    });
}));
exports.TeacherAttendanceController = {
    createTeacherAttendance,
    getAllTeacherAttendance,
    getTeacherAttendanceById,
    getTeacherAttendanceHistory,
    updateTeacherAttendance,
    deleteTeacherAttendance,
    teacherCheckIn,
    teacherCheckOut,
};
