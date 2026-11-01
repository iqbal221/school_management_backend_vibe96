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
exports.AttendanceDeviceService = void 0;
const prisma_1 = require("../../../../shared/prisma");
// =========================================================
// CREATE ATTENDANCE DEVICE
// =========================================================
const createAttendanceDevice = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, deviceCode, type, schoolId, isActive, } = payload;
    // -------------------------------------------------------
    // Check duplicate device code
    // -------------------------------------------------------
    const existingDevice = yield prisma_1.prisma.attendanceDevice.findUnique({
        where: {
            deviceCode,
        },
    });
    if (existingDevice) {
        throw new Error("Attendance device with this device code already exists");
    }
    // -------------------------------------------------------
    // Create device
    // -------------------------------------------------------
    const result = yield prisma_1.prisma.attendanceDevice.create({
        data: {
            name,
            deviceCode,
            type,
            schoolId,
            isActive: isActive !== undefined
                ? isActive
                : true,
        },
    });
    return result;
});
// =========================================================
// GET ALL ATTENDANCE DEVICES
// =========================================================
const getAllAttendanceDevices = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, type, isActive, schoolId, } = query;
    const andConditions = [];
    // -------------------------------------------------------
    // Search
    // -------------------------------------------------------
    if (searchTerm) {
        andConditions.push({
            OR: [
                {
                    name: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                },
                {
                    deviceCode: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                },
            ],
        });
    }
    // -------------------------------------------------------
    // School
    // -------------------------------------------------------
    if (schoolId) {
        andConditions.push({
            schoolId,
        });
    }
    // -------------------------------------------------------
    // Device type
    // -------------------------------------------------------
    if (type) {
        andConditions.push({
            type,
        });
    }
    // -------------------------------------------------------
    // Active status
    // -------------------------------------------------------
    if (isActive !== undefined) {
        andConditions.push({
            isActive,
        });
    }
    // -------------------------------------------------------
    // WHERE
    // -------------------------------------------------------
    const where = andConditions.length > 0
        ? {
            AND: andConditions,
        }
        : {};
    // -------------------------------------------------------
    // Get devices
    // -------------------------------------------------------
    const result = yield prisma_1.prisma.attendanceDevice.findMany({
        where,
        orderBy: {
            createdAt: "desc",
        },
    });
    return result;
});
// =========================================================
// GET SINGLE DEVICE
// =========================================================
const getAttendanceDeviceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.attendanceDevice.findUnique({
        where: {
            id,
        },
    });
    if (!result) {
        throw new Error("Attendance device not found");
    }
    return result;
});
// =========================================================
// GET DEVICE BY DEVICE CODE
// =========================================================
const getAttendanceDeviceByDeviceCode = (deviceCode) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.attendanceDevice.findUnique({
        where: {
            deviceCode,
        },
    });
    if (!result) {
        throw new Error("Attendance device not found");
    }
    return result;
});
// =========================================================
// UPDATE DEVICE
// =========================================================
const updateAttendanceDevice = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // -------------------------------------------------------
    // Check device
    // -------------------------------------------------------
    const existingDevice = yield prisma_1.prisma.attendanceDevice.findUnique({
        where: {
            id,
        },
    });
    if (!existingDevice) {
        throw new Error("Attendance device not found");
    }
    // -------------------------------------------------------
    // Check duplicate device code
    // -------------------------------------------------------
    if (payload.deviceCode &&
        payload.deviceCode !==
            existingDevice.deviceCode) {
        const duplicateDevice = yield prisma_1.prisma.attendanceDevice.findUnique({
            where: {
                deviceCode: payload.deviceCode,
            },
        });
        if (duplicateDevice) {
            throw new Error("Another attendance device already uses this device code");
        }
    }
    // -------------------------------------------------------
    // Update
    // -------------------------------------------------------
    const result = yield prisma_1.prisma.attendanceDevice.update({
        where: {
            id,
        },
        data: Object.assign({}, payload),
    });
    return result;
});
// =========================================================
// DELETE DEVICE
// =========================================================
const deleteAttendanceDevice = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // -------------------------------------------------------
    // Check device
    // -------------------------------------------------------
    const existingDevice = yield prisma_1.prisma.attendanceDevice.findUnique({
        where: {
            id,
        },
    });
    if (!existingDevice) {
        throw new Error("Attendance device not found");
    }
    // -------------------------------------------------------
    // Delete
    // -------------------------------------------------------
    const result = yield prisma_1.prisma.attendanceDevice.delete({
        where: {
            id,
        },
    });
    return result;
});
// =========================================================
// ACTIVATE DEVICE
// =========================================================
const activateAttendanceDevice = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingDevice = yield prisma_1.prisma.attendanceDevice.findUnique({
        where: {
            id,
        },
    });
    if (!existingDevice) {
        throw new Error("Attendance device not found");
    }
    const result = yield prisma_1.prisma.attendanceDevice.update({
        where: {
            id,
        },
        data: {
            isActive: true,
        },
    });
    return result;
});
// =========================================================
// DEACTIVATE DEVICE
// =========================================================
const deactivateAttendanceDevice = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingDevice = yield prisma_1.prisma.attendanceDevice.findUnique({
        where: {
            id,
        },
    });
    if (!existingDevice) {
        throw new Error("Attendance device not found");
    }
    const result = yield prisma_1.prisma.attendanceDevice.update({
        where: {
            id,
        },
        data: {
            isActive: false,
        },
    });
    return result;
});
// =========================================================
// DEVICE HEARTBEAT
// =========================================================
const attendanceDeviceHeartbeat = (deviceCode) => __awaiter(void 0, void 0, void 0, function* () {
    // -------------------------------------------------------
    // Find device
    // -------------------------------------------------------
    const device = yield prisma_1.prisma.attendanceDevice.findUnique({
        where: {
            deviceCode,
        },
    });
    if (!device) {
        throw new Error("Attendance device not found");
    }
    // -------------------------------------------------------
    // Check active
    // -------------------------------------------------------
    if (!device.isActive) {
        throw new Error("Attendance device is inactive");
    }
    // -------------------------------------------------------
    // Update last seen
    // -------------------------------------------------------
    const result = yield prisma_1.prisma.attendanceDevice.update({
        where: {
            deviceCode,
        },
        data: {
            lastSeenAt: new Date(),
        },
    });
    return result;
});
// =========================================================
// GET ACTIVE DEVICES
// =========================================================
const getActiveAttendanceDevices = (schoolId) => __awaiter(void 0, void 0, void 0, function* () {
    const where = {
        isActive: true,
    };
    if (schoolId) {
        where.schoolId = schoolId;
    }
    const result = yield prisma_1.prisma.attendanceDevice.findMany({
        where,
        orderBy: {
            createdAt: "desc",
        },
    });
    return result;
});
// =========================================================
// EXPORT
// =========================================================
exports.AttendanceDeviceService = {
    createAttendanceDevice,
    getAllAttendanceDevices,
    getAttendanceDeviceById,
    getAttendanceDeviceByDeviceCode,
    updateAttendanceDevice,
    deleteAttendanceDevice,
    activateAttendanceDevice,
    deactivateAttendanceDevice,
    attendanceDeviceHeartbeat,
    getActiveAttendanceDevices,
};
