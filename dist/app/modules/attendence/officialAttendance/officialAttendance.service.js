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
exports.OfficialAttendanceService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../../../shared/prisma");
// =========================================================
// CREATE OFFICIAL ATTENDANCE
// =========================================================
const createOfficialAttendance = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { officialId, attendanceDate, checkInTime, checkOutTime, status, method, confidence, deviceId, verificationId, } = payload;
    // -------------------------------------------------------
    // Check official exists
    // -------------------------------------------------------
    const official = yield prisma_1.prisma.official.findUnique({
        where: {
            id: officialId,
        },
    });
    if (!official) {
        throw new Error("Official not found");
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
    const existingAttendance = yield prisma_1.prisma.officialAttendance.findUnique({
        where: {
            officialId_attendanceDate: {
                officialId,
                attendanceDate: date,
            },
        },
    });
    if (existingAttendance) {
        throw new Error("Official attendance already exists for this date");
    }
    // -------------------------------------------------------
    // Create attendance
    // -------------------------------------------------------
    const result = yield prisma_1.prisma.officialAttendance.create({
        data: {
            officialId,
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
            official: true,
        },
    });
    return result;
});
// =========================================================
// GET ALL OFFICIAL ATTENDANCE
// =========================================================
const getAllOfficialAttendance = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { officialId, status, method, startDate, endDate, } = params;
    const where = {};
    if (officialId) {
        where.officialId = officialId;
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
    const result = yield prisma_1.prisma.officialAttendance.findMany({
        where,
        include: {
            official: true,
        },
        orderBy: {
            attendanceDate: "desc",
        },
    });
    return result;
});
// =========================================================
// GET SINGLE OFFICIAL ATTENDANCE
// =========================================================
const getOfficialAttendanceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.officialAttendance.findUnique({
        where: {
            id,
        },
        include: {
            official: true,
        },
    });
    if (!result) {
        throw new Error("Official attendance not found");
    }
    return result;
});
// =========================================================
// GET OFFICIAL ATTENDANCE HISTORY
// =========================================================
const getOfficialAttendanceHistory = (officialId, startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    // -------------------------------------------------------
    // Check official
    // -------------------------------------------------------
    const official = yield prisma_1.prisma.official.findUnique({
        where: {
            id: officialId,
        },
    });
    if (!official) {
        throw new Error("Official not found");
    }
    // -------------------------------------------------------
    // Build where condition
    // -------------------------------------------------------
    const where = {
        officialId,
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
    // -------------------------------------------------------
    // Get history
    // -------------------------------------------------------
    const result = yield prisma_1.prisma.officialAttendance.findMany({
        where,
        orderBy: {
            attendanceDate: "desc",
        },
    });
    return result;
});
// =========================================================
// UPDATE OFFICIAL ATTENDANCE
// =========================================================
const updateOfficialAttendance = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // -------------------------------------------------------
    // Check attendance
    // -------------------------------------------------------
    const existingAttendance = yield prisma_1.prisma.officialAttendance.findUnique({
        where: {
            id,
        },
    });
    if (!existingAttendance) {
        throw new Error("Official attendance not found");
    }
    // -------------------------------------------------------
    // Update
    // -------------------------------------------------------
    const result = yield prisma_1.prisma.officialAttendance.update({
        where: {
            id,
        },
        data: Object.assign({}, payload),
        include: {
            official: true,
        },
    });
    return result;
});
// =========================================================
// DELETE OFFICIAL ATTENDANCE
// =========================================================
const deleteOfficialAttendance = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingAttendance = yield prisma_1.prisma.officialAttendance.findUnique({
        where: {
            id,
        },
    });
    if (!existingAttendance) {
        throw new Error("Official attendance not found");
    }
    const result = yield prisma_1.prisma.officialAttendance.delete({
        where: {
            id,
        },
    });
    return result;
});
// =========================================================
// OFFICIAL CHECK-IN
// =========================================================
const officialCheckIn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { officialId, method, confidence, deviceId, verificationId, } = payload;
    const now = new Date();
    // -------------------------------------------------------
    // Start of today
    // -------------------------------------------------------
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);
    // -------------------------------------------------------
    // End of today
    // -------------------------------------------------------
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    // -------------------------------------------------------
    // Check duplicate
    // -------------------------------------------------------
    const existingAttendance = yield prisma_1.prisma.officialAttendance.findFirst({
        where: {
            officialId,
            attendanceDate: {
                gte: startOfDay,
                lte: endOfDay,
            },
        },
    });
    if (existingAttendance) {
        throw new Error("Official has already checked in today");
    }
    // -------------------------------------------------------
    // Create
    // -------------------------------------------------------
    const result = yield prisma_1.prisma.officialAttendance.create({
        data: {
            officialId,
            attendanceDate: startOfDay,
            checkInTime: now,
            status: client_1.AttendanceStatus.PRESENT,
            method,
            confidence,
            deviceId,
            verificationId,
        },
        include: {
            official: true,
        },
    });
    return result;
});
// =========================================================
// OFFICIAL CHECK-OUT
// =========================================================
const officialCheckOut = (officialId) => __awaiter(void 0, void 0, void 0, function* () {
    const now = new Date();
    // -------------------------------------------------------
    // Start of today
    // -------------------------------------------------------
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);
    // -------------------------------------------------------
    // End of today
    // -------------------------------------------------------
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    // -------------------------------------------------------
    // Find today's attendance
    // -------------------------------------------------------
    const attendance = yield prisma_1.prisma.officialAttendance.findFirst({
        where: {
            officialId,
            attendanceDate: {
                gte: startOfDay,
                lte: endOfDay,
            },
        },
    });
    if (!attendance) {
        throw new Error("Official attendance not found for today");
    }
    // -------------------------------------------------------
    // Already checked out
    // -------------------------------------------------------
    if (attendance.checkOutTime) {
        throw new Error("Official has already checked out today");
    }
    // -------------------------------------------------------
    // Update checkout
    // -------------------------------------------------------
    const result = yield prisma_1.prisma.officialAttendance.update({
        where: {
            id: attendance.id,
        },
        data: {
            checkOutTime: now,
        },
        include: {
            official: true,
        },
    });
    return result;
});
// =========================================================
// EXPORT
// =========================================================
exports.OfficialAttendanceService = {
    createOfficialAttendance,
    getAllOfficialAttendance,
    getOfficialAttendanceById,
    getOfficialAttendanceHistory,
    updateOfficialAttendance,
    deleteOfficialAttendance,
    officialCheckIn,
    officialCheckOut,
};
