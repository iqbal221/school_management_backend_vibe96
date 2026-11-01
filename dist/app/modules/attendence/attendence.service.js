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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../shared/prisma");
const attendence_constant_1 = require("./attendence.constant");
const InsertStudentAttedanceIntoDB = (attendanceInfo) => __awaiter(void 0, void 0, void 0, function* () {
    let { attendanceDate } = attendanceInfo;
    const { attendance } = attendanceInfo;
    const dateString = attendanceDate;
    const dateObject = new Date(dateString);
    // // Convert the date object to ISO format
    const isoString = dateObject.toISOString();
    attendanceDate = isoString;
    const attendanceRecords = Object.keys(attendance).map((studentId) => ({
        attendanceDate,
        status: attendance[studentId],
        studentId,
    }));
    const result = yield prisma_1.prisma.studentAttendance.createMany({
        data: attendanceRecords,
    });
    return result;
});
const InsertTeacherAttendanceIntoDB = (attendanceInfo) => __awaiter(void 0, void 0, void 0, function* () {
    let { attendanceDate } = attendanceInfo;
    const { attendance } = attendanceInfo;
    const dateString = attendanceDate;
    const dateObject = new Date(dateString);
    // // Convert the date object to ISO format
    const isoString = dateObject.toISOString();
    attendanceDate = isoString;
    const attendanceRecords = Object.keys(attendance).map(teacherId => ({
        attendanceDate,
        status: attendance[teacherId],
        teacherId,
    }));
    const result = yield prisma_1.prisma.teacherAttendance.createMany({
        data: attendanceRecords,
    });
    return result;
});
const InsertOfficialAttendanceIntoDB = (attendanceInfo) => __awaiter(void 0, void 0, void 0, function* () {
    let { attendanceDate } = attendanceInfo;
    const { attendance } = attendanceInfo;
    const dateString = attendanceDate;
    const dateObject = new Date(dateString);
    // // Convert the date object to ISO format
    const isoString = dateObject.toISOString();
    attendanceDate = isoString;
    const attendanceRecords = Object.keys(attendance).map(officialId => ({
        attendanceDate,
        status: attendance[officialId],
        officialId,
    }));
    const result = yield prisma_1.prisma.officialAttendance.createMany({
        data: attendanceRecords,
    });
    return result;
});
const GetStudentAttedanceFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: attendence_constant_1.AttendanceSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length > 0) {
        andConditions.push({
            AND: Object.keys(filtersData).map(key => ({
                [key]: {
                    equals: filtersData[key],
                },
            })),
        });
    }
    const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.prisma.studentAttendance.findMany({
        include: {
            student: true,
        },
        where: whereCondition,
        take: limit,
        skip,
        orderBy: sortBy && sortOrder
            ? {
                attendanceDate: 'asc',
            }
            : {
                [sortBy]: sortOrder,
            },
    });
    const total = yield prisma_1.prisma.studentAttendance.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const GetTeacherAttedanceFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: attendence_constant_1.AttendanceSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length > 0) {
        andConditions.push({
            AND: Object.keys(filtersData).map(key => ({
                [key]: {
                    equals: filtersData[key],
                },
            })),
        });
    }
    const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.prisma.teacherAttendance.findMany({
        include: {
            teacher: true,
        },
        where: whereCondition,
        take: limit,
        skip,
        orderBy: sortBy && sortOrder
            ? {
                attendanceDate: 'asc',
            }
            : {
                [sortBy]: sortOrder,
            },
    });
    const total = yield prisma_1.prisma.teacherAttendance.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const GetOfficialAttedanceFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: attendence_constant_1.AttendanceSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length > 0) {
        andConditions.push({
            AND: Object.keys(filtersData).map(key => ({
                [key]: {
                    equals: filtersData[key],
                },
            })),
        });
    }
    const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.prisma.officialAttendance.findMany({
        include: {
            official: true,
        },
        where: whereCondition,
        take: limit,
        skip,
        orderBy: sortBy && sortOrder
            ? {
                attendanceDate: 'asc',
            }
            : {
                [sortBy]: sortOrder,
            },
    });
    const total = yield prisma_1.prisma.officialAttendance.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
exports.AttendanceService = {
    InsertStudentAttedanceIntoDB,
    InsertTeacherAttendanceIntoDB,
    InsertOfficialAttendanceIntoDB,
    GetStudentAttedanceFromDB,
    GetTeacherAttedanceFromDB,
    GetOfficialAttedanceFromDB,
};
