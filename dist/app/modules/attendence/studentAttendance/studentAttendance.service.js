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
exports.StudentAttendanceService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createStudentAttendance = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("attendance body:", payload);
    // =====================================================
    // 2. PARSE JSON STRING IF NEEDED
    // =====================================================
    if (typeof payload === "string") {
        try {
            payload = JSON.parse(payload);
        }
        catch (error) {
            throw new Error("Invalid attendance JSON payload");
        }
    }
    // =====================================================
    // 3. VALIDATE REQUIRED FIELDS
    // =====================================================
    const { studentId, attendanceDate, classId, sectionId, markedById, remarks, status, method, confidence, deviceId, checkInTime, checkOutTime, } = payload;
    // =====================================================
    // 1. CHECK STUDENT
    // =====================================================
    const student = yield prisma.student.findUnique({
        where: {
            id: studentId,
        },
    });
    // console.log('student', student);
    if (!student) {
        throw new Error('Student not found');
    }
    // =====================================================
    // 2. ATTENDANCE DATE
    // =====================================================
    const date = attendanceDate
        ? new Date(attendanceDate)
        : new Date();
    if (isNaN(date.getTime())) {
        throw new Error('Invalid attendance date');
    }
    // =====================================================
    // 3. CHECK DUPLICATE ATTENDANCE
    // =====================================================
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    const existingAttendance = yield prisma.studentAttendance.findFirst({
        where: {
            studentId,
            attendanceDate: {
                gte: startOfDay,
                lte: endOfDay,
            },
        },
    });
    console.log('existingAttendance', existingAttendance);
    if (existingAttendance) {
        throw new Error('Student attendance has already been recorded for this date');
    }
    // =====================================================
    // 4. CREATE ATTENDANCE
    // =====================================================
    const attendance = yield prisma.studentAttendance.create({
        data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ studentId }, (classId && {
            classId,
        })), (sectionId && {
            sectionId,
        })), { attendanceDate: date, status,
            method }), (checkInTime && {
            checkInTime: new Date(checkInTime),
        })), (checkOutTime && {
            checkOutTime: new Date(checkOutTime),
        })), (deviceId && {
            deviceId,
        })), (confidence !== undefined && {
            confidence,
        })), (remarks && {
            remarks,
        })), (markedById && {
            markedById,
        })),
        include: {
            student: true,
        },
    });
    return attendance;
});
// =======================================================
// GET ALL STUDENT ATTENDANCE
// =======================================================
const getAllStudentAttendance = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId, classId, sectionId, status, method, date, page = 1, limit = 20, } = query;
    const skip = (Number(page) - 1) * Number(limit);
    const where = {};
    if (studentId) {
        where.studentId = studentId;
    }
    if (classId) {
        where.classId = classId;
    }
    if (sectionId) {
        where.sectionId = sectionId;
    }
    if (status) {
        where.status = status;
    }
    if (method) {
        where.method = method;
    }
    // =====================================================
    // DATE FILTER
    // =====================================================
    if (date) {
        const selectedDate = new Date(date);
        if (isNaN(selectedDate.getTime())) {
            throw new Error('Invalid date');
        }
        const startOfDay = new Date(selectedDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(selectedDate);
        endOfDay.setHours(23, 59, 59, 999);
        where.attendanceDate = {
            gte: startOfDay,
            lte: endOfDay,
        };
    }
    const [data, total] = yield Promise.all([
        prisma.studentAttendance.findMany({
            where,
            skip,
            take: Number(limit),
            orderBy: {
                attendanceDate: 'desc',
            },
            include: {
                student: true,
            },
        }),
        prisma.studentAttendance.count({
            where,
        }),
    ]);
    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            total,
            totalPage: Math.ceil(total / Number(limit)),
        },
        data,
    };
});
// =======================================================
// GET SINGLE ATTENDANCE
// =======================================================
const getStudentAttendanceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const attendance = yield prisma.studentAttendance.findUnique({
        where: {
            id,
        },
        include: {
            student: true,
        },
    });
    if (!attendance) {
        throw new Error('Student attendance not found');
    }
    return attendance;
});
// =======================================================
// GET STUDENT ATTENDANCE HISTORY
// =======================================================
const getStudentAttendanceHistory = (studentId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate, } = query;
    const where = {
        studentId,
    };
    if (startDate || endDate) {
        where.attendanceDate = {};
        if (startDate) {
            const start = new Date(startDate);
            start.setHours(0, 0, 0, 0);
            where.attendanceDate.gte = start;
        }
        if (endDate) {
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
            where.attendanceDate.lte = end;
        }
    }
    const data = yield prisma.studentAttendance.findMany({
        where,
        orderBy: {
            attendanceDate: 'desc',
        },
    });
    return data;
});
// =======================================================
// UPDATE ATTENDANCE
// =======================================================
const updateStudentAttendance = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield prisma.studentAttendance.findUnique({
        where: {
            id,
        },
    });
    if (!existing) {
        throw new Error('Student attendance not found');
    }
    const data = {};
    if (payload.status !== undefined) {
        data.status = payload.status;
    }
    if (payload.checkInTime !== undefined) {
        data.checkInTime =
            new Date(payload.checkInTime);
    }
    if (payload.checkOutTime !== undefined) {
        data.checkOutTime =
            new Date(payload.checkOutTime);
    }
    if (payload.remarks !== undefined) {
        data.remarks = payload.remarks;
    }
    const result = yield prisma.studentAttendance.update({
        where: {
            id,
        },
        data,
        include: {
            student: true,
        },
    });
    return result;
});
// =======================================================
// DELETE ATTENDANCE
// =======================================================
const deleteStudentAttendance = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield prisma.studentAttendance.findUnique({
        where: {
            id,
        },
    });
    if (!existing) {
        throw new Error('Student attendance not found');
    }
    yield prisma.studentAttendance.delete({
        where: {
            id,
        },
    });
    return {
        message: 'Student attendance deleted successfully',
    };
});
exports.StudentAttendanceService = {
    createStudentAttendance,
    getAllStudentAttendance,
    getStudentAttendanceById,
    getStudentAttendanceHistory,
    updateStudentAttendance,
    deleteStudentAttendance,
};
