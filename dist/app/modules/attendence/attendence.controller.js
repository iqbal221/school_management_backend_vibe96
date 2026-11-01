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
exports.AttendanceController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const attendence_constant_1 = require("./attendence.constant");
const attendence_service_1 = require("./attendence.service");
const InsertStudentAttedanceIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield attendence_service_1.AttendanceService.InsertStudentAttedanceIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Student Attendence created ',
        data: result,
    });
}));
const InsertTeacherAttedanceIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield attendence_service_1.AttendanceService.InsertTeacherAttendanceIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Teacher Attendence created ',
        data: result,
    });
}));
const InsertOfficialAttedanceIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield attendence_service_1.AttendanceService.InsertOfficialAttendanceIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Official Attendence created ',
        data: result,
    });
}));
const GetStudentAttedanceFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, attendence_constant_1.AttendanceFilterableFields);
    const options = (0, pick_1.default)(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const result = yield attendence_service_1.AttendanceService.GetStudentAttedanceFromDB(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Student Attendance Data fetched',
        meta: result.meta,
        data: result.data,
    });
}));
const GetTeacherAttedanceFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, attendence_constant_1.AttendanceFilterableFields);
    const options = (0, pick_1.default)(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const result = yield attendence_service_1.AttendanceService.GetTeacherAttedanceFromDB(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Teacher Attendance Data fetched',
        meta: result.meta,
        data: result.data,
    });
}));
const GetOfficialAttedanceFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, attendence_constant_1.AttendanceFilterableFields);
    const options = (0, pick_1.default)(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const result = yield attendence_service_1.AttendanceService.GetOfficialAttedanceFromDB(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Official Attendance Data fetched',
        meta: result.meta,
        data: result.data,
    });
}));
exports.AttendanceController = {
    InsertStudentAttedanceIntoDB,
    InsertTeacherAttedanceIntoDB,
    InsertOfficialAttedanceIntoDB,
    GetStudentAttedanceFromDB,
    GetTeacherAttedanceFromDB,
    GetOfficialAttedanceFromDB,
};
