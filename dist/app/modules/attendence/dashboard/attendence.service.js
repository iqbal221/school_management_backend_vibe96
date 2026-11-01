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
exports.AttendanceDashboardService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../../../shared/prisma");
// =========================================================
// HELPER: START OF DAY
// =========================================================
const getStartOfDay = (date) => {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
};
// =========================================================
// HELPER: END OF DAY
// =========================================================
const getEndOfDay = (date) => {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
};
// =========================================================
// STATUS SUMMARY
// =========================================================
const getStatusSummary = (attendance) => {
    const summary = {
        present: 0,
        absent: 0,
        late: 0,
        leave: 0,
        total: attendance.length,
    };
    attendance.forEach((item) => {
        switch (item.status) {
            case client_1.AttendanceStatus.PRESENT:
                summary.present++;
                break;
            case client_1.AttendanceStatus.ABSENT:
                summary.absent++;
                break;
            case client_1.AttendanceStatus.LATE:
                summary.late++;
                break;
        }
    });
    return summary;
};
// =========================================================
// METHOD SUMMARY
// =========================================================
const getMethodSummary = (attendance) => {
    const summary = {
        face: 0,
        biometric: 0,
        web: 0,
        total: attendance.length,
    };
    attendance.forEach((item) => {
        switch (item.method) {
            case client_1.AttendanceMethod.FACE:
                summary.face++;
                break;
            case client_1.AttendanceMethod.BIOMETRIC:
                summary.biometric++;
                break;
            case client_1.AttendanceMethod.WEB:
                summary.web++;
                break;
        }
    });
    return summary;
};
// =========================================================
// ATTENDANCE PERCENTAGE
// =========================================================
const calculateAttendancePercentage = (present, late, total) => {
    if (total === 0) {
        return 0;
    }
    const attended = present + late;
    return Number(((attended / total) * 100).toFixed(2));
};
// =========================================================
// GET ATTENDANCE DASHBOARD
// =========================================================
const getAttendanceDashboard = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // -------------------------------------------------------
    // Date
    // -------------------------------------------------------
    const selectedDate = query.date
        ? new Date(query.date)
        : new Date();
    const startOfDay = getStartOfDay(selectedDate);
    const endOfDay = getEndOfDay(selectedDate);
    // -------------------------------------------------------
    // DATE RANGE
    // -------------------------------------------------------
    const startDate = query.startDate
        ? getStartOfDay(new Date(query.startDate))
        : startOfDay;
    const endDate = query.endDate
        ? getEndOfDay(new Date(query.endDate))
        : endOfDay;
    // =======================================================
    // GET TOTAL PEOPLE
    // =======================================================
    const [totalStudents, totalTeachers, totalOfficials,] = yield Promise.all([
        prisma_1.prisma.student.count(),
        prisma_1.prisma.teacher.count(),
        prisma_1.prisma.official.count(),
    ]);
    // =======================================================
    // GET STUDENT ATTENDANCE
    // =======================================================
    const studentAttendance = yield prisma_1.prisma.studentAttendance.findMany({
        where: {
            attendanceDate: {
                gte: startDate,
                lte: endDate,
            },
        },
        include: {
            student: true,
        },
        orderBy: {
            attendanceDate: "desc",
        },
    });
    // =======================================================
    // GET TEACHER ATTENDANCE
    // =======================================================
    const teacherAttendance = yield prisma_1.prisma.teacherAttendance.findMany({
        where: {
            attendanceDate: {
                gte: startDate,
                lte: endDate,
            },
        },
        include: {
            teacher: true,
        },
        orderBy: {
            attendanceDate: "desc",
        },
    });
    // =======================================================
    // GET OFFICIAL ATTENDANCE
    // =======================================================
    const officialAttendance = yield prisma_1.prisma.officialAttendance.findMany({
        where: {
            attendanceDate: {
                gte: startDate,
                lte: endDate,
            },
        },
        include: {
            official: true,
        },
        orderBy: {
            attendanceDate: "desc",
        },
    });
    // =======================================================
    // STUDENT SUMMARY
    // =======================================================
    const studentStatus = getStatusSummary(studentAttendance);
    const studentMethods = getMethodSummary(studentAttendance);
    const studentPercentage = calculateAttendancePercentage(studentStatus.present, studentStatus.late, totalStudents);
    // =======================================================
    // TEACHER SUMMARY
    // =======================================================
    const teacherStatus = getStatusSummary(teacherAttendance);
    const teacherMethods = getMethodSummary(teacherAttendance);
    const teacherPercentage = calculateAttendancePercentage(teacherStatus.present, teacherStatus.late, totalTeachers);
    // =======================================================
    // OFFICIAL SUMMARY
    // =======================================================
    const officialStatus = getStatusSummary(officialAttendance);
    const officialMethods = getMethodSummary(officialAttendance);
    const officialPercentage = calculateAttendancePercentage(officialStatus.present, officialStatus.late, totalOfficials);
    // =======================================================
    // RETURN DASHBOARD
    // =======================================================
    return {
        date: selectedDate
            .toISOString()
            .split("T")[0],
        totals: {
            students: totalStudents,
            teachers: totalTeachers,
            officials: totalOfficials,
        },
        students: Object.assign(Object.assign({}, studentStatus), { attendancePercentage: studentPercentage }),
        teachers: Object.assign(Object.assign({}, teacherStatus), { attendancePercentage: teacherPercentage }),
        officials: Object.assign(Object.assign({}, officialStatus), { attendancePercentage: officialPercentage }),
        methods: {
            students: studentMethods,
            teachers: teacherMethods,
            officials: officialMethods,
        },
        recentAttendance: {
            students: studentAttendance.slice(0, 10),
            teachers: teacherAttendance.slice(0, 10),
            officials: officialAttendance.slice(0, 10),
        },
    };
});
// =========================================================
// TODAY'S ATTENDANCE
// =========================================================
const getTodayAttendance = () => __awaiter(void 0, void 0, void 0, function* () {
    return getAttendanceDashboard({
        date: new Date()
            .toISOString()
            .split("T")[0],
    });
});
// =========================================================
// EXPORT
// =========================================================
exports.AttendanceDashboardService = {
    getAttendanceDashboard,
    getTodayAttendance,
};
