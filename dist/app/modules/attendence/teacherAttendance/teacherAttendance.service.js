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
exports.TeacherAttendanceService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../../../shared/prisma");
// =========================================================
// CREATE TEACHER ATTENDANCE
// =========================================================
const createTeacherAttendance = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { teacherId, attendanceDate, checkInTime, checkOutTime, status, method, confidence, deviceId, verificationId, } = payload;
    // -------------------------------------------------------
    // Check teacher exists
    // -------------------------------------------------------
    const teacher = yield prisma_1.prisma.teacher.findUnique({
        where: {
            id: teacherId,
        },
    });
    if (!teacher) {
        throw new Error("Teacher not found");
    }
    // -------------------------------------------------------
    // Attendance date
    // -------------------------------------------------------
    const date = attendanceDate
        ? new Date(attendanceDate)
        : new Date();
    // -------------------------------------------------------
    // Check duplicate attendance
    // -------------------------------------------------------
    const existingAttendance = yield prisma_1.prisma.teacherAttendance.findUnique({
        where: {
            teacherId_attendanceDate: {
                teacherId,
                attendanceDate: date,
            },
        },
    });
    if (existingAttendance) {
        throw new Error("Teacher attendance already exists for this date");
    }
    // -------------------------------------------------------
    // Create attendance
    // -------------------------------------------------------
    const result = yield prisma_1.prisma.teacherAttendance.create({
        data: {
            teacherId,
            attendanceDate: date,
            checkInTime,
            checkOutTime,
            status: status !== null && status !== void 0 ? status : client_1.AttendanceStatus.PRESENT,
            method,
            confidence,
            deviceId,
            verificationId,
        },
        include: {
            teacher: true,
        },
    });
    return result;
});
// =========================================================
// GET ALL TEACHER ATTENDANCE
// =========================================================
const getAllTeacherAttendance = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { teacherId, status, method, startDate, endDate, } = params;
    const where = {};
    if (teacherId) {
        where.teacherId = teacherId;
    }
    if (status) {
        where.status = status;
    }
    if (method) {
        where.method = method;
    }
    if (startDate || endDate) {
        where.attendanceDate = {};
        if (startDate) {
            where.attendanceDate.gte = startDate;
        }
        if (endDate) {
            where.attendanceDate.lte = endDate;
        }
    }
    const result = yield prisma_1.prisma.teacherAttendance.findMany({
        where,
        include: {
            teacher: true,
        },
        orderBy: {
            attendanceDate: "desc",
        },
    });
    return result;
});
// =========================================================
// GET SINGLE TEACHER ATTENDANCE
// =========================================================
const getTeacherAttendanceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.teacherAttendance.findUnique({
        where: {
            id,
        },
        include: {
            teacher: true,
        },
    });
    if (!result) {
        throw new Error("Teacher attendance not found");
    }
    return result;
});
// =========================================================
// GET TEACHER ATTENDANCE HISTORY
// =========================================================
const getTeacherAttendanceHistory = (teacherId, startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    const teacher = yield prisma_1.prisma.teacher.findUnique({
        where: {
            id: teacherId,
        },
    });
    if (!teacher) {
        throw new Error("Teacher not found");
    }
    const where = {
        teacherId,
    };
    if (startDate || endDate) {
        where.attendanceDate = {};
        if (startDate) {
            where.attendanceDate.gte = startDate;
        }
        if (endDate) {
            where.attendanceDate.lte = endDate;
        }
    }
    const result = yield prisma_1.prisma.teacherAttendance.findMany({
        where,
        orderBy: {
            attendanceDate: "desc",
        },
    });
    return result;
});
// =========================================================
// UPDATE TEACHER ATTENDANCE
// =========================================================
const updateTeacherAttendance = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingAttendance = yield prisma_1.prisma.teacherAttendance.findUnique({
        where: {
            id,
        },
    });
    if (!existingAttendance) {
        throw new Error("Teacher attendance not found");
    }
    const result = yield prisma_1.prisma.teacherAttendance.update({
        where: {
            id,
        },
        data: Object.assign({}, payload),
        include: {
            teacher: true,
        },
    });
    return result;
});
// =========================================================
// DELETE TEACHER ATTENDANCE
// =========================================================
const deleteTeacherAttendance = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingAttendance = yield prisma_1.prisma.teacherAttendance.findUnique({
        where: {
            id,
        },
    });
    if (!existingAttendance) {
        throw new Error("Teacher attendance not found");
    }
    const result = yield prisma_1.prisma.teacherAttendance.delete({
        where: {
            id,
        },
    });
    return result;
});
// =========================================================
// TEACHER CHECK-IN
// =========================================================
const teacherCheckIn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { teacherId, method, confidence, deviceId, verificationId, } = payload;
    const now = new Date();
    // Start of today
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);
    // End of today
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    const existingAttendance = yield prisma_1.prisma.teacherAttendance.findFirst({
        where: {
            teacherId,
            attendanceDate: {
                gte: startOfDay,
                lte: endOfDay,
            },
        },
    });
    if (existingAttendance) {
        throw new Error("Teacher has already checked in today");
    }
    const result = yield prisma_1.prisma.teacherAttendance.create({
        data: {
            teacherId,
            attendanceDate: startOfDay,
            checkInTime: now,
            status: client_1.AttendanceStatus.PRESENT,
            method,
            confidence,
            deviceId,
            verificationId,
        },
        include: {
            teacher: true,
        },
    });
    return result;
});
// =========================================================
// TEACHER CHECK-OUT
// =========================================================
const teacherCheckOut = (teacherId) => __awaiter(void 0, void 0, void 0, function* () {
    const now = new Date();
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    const attendance = yield prisma_1.prisma.teacherAttendance.findFirst({
        where: {
            teacherId,
            attendanceDate: {
                gte: startOfDay,
                lte: endOfDay,
            },
        },
    });
    if (!attendance) {
        throw new Error("Teacher attendance not found for today");
    }
    if (attendance.checkOutTime) {
        throw new Error("Teacher has already checked out today");
    }
    const result = yield prisma_1.prisma.teacherAttendance.update({
        where: {
            id: attendance.id,
        },
        data: {
            checkOutTime: now,
        },
        include: {
            teacher: true,
        },
    });
    return result;
});
exports.TeacherAttendanceService = {
    createTeacherAttendance,
    getAllTeacherAttendance,
    getTeacherAttendanceById,
    getTeacherAttendanceHistory,
    updateTeacherAttendance,
    deleteTeacherAttendance,
    teacherCheckIn,
    teacherCheckOut,
};
