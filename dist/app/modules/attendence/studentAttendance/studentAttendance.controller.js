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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentAttendanceController = void 0;
const studentAttendance_service_1 = require("./studentAttendance.service");
// =======================================================
// CREATE STUDENT ATTENDANCE
// =======================================================
const createStudentAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield studentAttendance_service_1.StudentAttendanceService.createStudentAttendance(req.body);
        console.log('createStudentAttendance result:', result);
        res.status(201).json({
            success: true,
            message: 'Student attendance created successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: (error === null || error === void 0 ? void 0 : error.message) ||
                'Failed to create student attendance',
            error,
        });
    }
});
// =======================================================
// GET ALL STUDENT ATTENDANCE
// =======================================================
const getAllStudentAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield studentAttendance_service_1.StudentAttendanceService.getAllStudentAttendance(req.query);
        res.status(200).json({
            success: true,
            message: 'Student attendance retrieved successfully',
            meta: result.meta,
            data: result.data,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: (error === null || error === void 0 ? void 0 : error.message) ||
                'Failed to retrieve student attendance',
            error,
        });
    }
});
// =======================================================
// GET SINGLE ATTENDANCE
// =======================================================
const getStudentAttendanceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield studentAttendance_service_1.StudentAttendanceService.getStudentAttendanceById(id);
        res.status(200).json({
            success: true,
            message: 'Student attendance retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: (error === null || error === void 0 ? void 0 : error.message) ||
                'Student attendance not found',
            error,
        });
    }
});
// =======================================================
// STUDENT ATTENDANCE HISTORY
// =======================================================
const getStudentAttendanceHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const result = yield studentAttendance_service_1.StudentAttendanceService.getStudentAttendanceHistory(studentId, req.query);
        res.status(200).json({
            success: true,
            message: 'Student attendance history retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: (error === null || error === void 0 ? void 0 : error.message) ||
                'Failed to retrieve attendance history',
            error,
        });
    }
});
// =======================================================
// UPDATE ATTENDANCE
// =======================================================
const updateStudentAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield studentAttendance_service_1.StudentAttendanceService.updateStudentAttendance(id, req.body);
        res.status(200).json({
            success: true,
            message: 'Student attendance updated successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: (error === null || error === void 0 ? void 0 : error.message) ||
                'Failed to update student attendance',
            error,
        });
    }
});
// =======================================================
// DELETE ATTENDANCE
// =======================================================
const deleteStudentAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield studentAttendance_service_1.StudentAttendanceService.deleteStudentAttendance(id);
        res.status(200).json({
            success: true,
            message: result.message,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: (error === null || error === void 0 ? void 0 : error.message) ||
                'Failed to delete student attendance',
            error,
        });
    }
});
exports.StudentAttendanceController = {
    createStudentAttendance,
    getAllStudentAttendance,
    getStudentAttendanceById,
    getStudentAttendanceHistory,
    updateStudentAttendance,
    deleteStudentAttendance,
};
