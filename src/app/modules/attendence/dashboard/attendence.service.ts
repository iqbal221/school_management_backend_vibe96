import {
  AttendanceMethod,
  AttendanceStatus
} from "@prisma/client";
import { prisma } from "../../../../shared/prisma";
import { IAttendanceDashboardQuery } from "./attendence.interface";



// =========================================================
// HELPER: START OF DAY
// =========================================================

const getStartOfDay = (date: Date) => {
  const result = new Date(date);

  result.setHours(0, 0, 0, 0);

  return result;
};

// =========================================================
// HELPER: END OF DAY
// =========================================================

const getEndOfDay = (date: Date) => {
  const result = new Date(date);

  result.setHours(23, 59, 59, 999);

  return result;
};

// =========================================================
// STATUS SUMMARY
// =========================================================

const getStatusSummary = (
  attendance: {
    status: AttendanceStatus;
  }[]
) => {
  const summary = {
    present: 0,
    absent: 0,
    late: 0,
    leave: 0,
    total: attendance.length,
  };

  attendance.forEach((item) => {
    switch (item.status) {
      case AttendanceStatus.PRESENT:
        summary.present++;
        break;

      case AttendanceStatus.ABSENT:
        summary.absent++;
        break;

      case AttendanceStatus.LATE:
        summary.late++;
        break;

     
    }
  });

  return summary;
};

// =========================================================
// METHOD SUMMARY
// =========================================================

const getMethodSummary = (
  attendance: {
    method: AttendanceMethod;
  }[]
) => {
  const summary = {
    face: 0,
    biometric: 0,
    web: 0,
    total: attendance.length,
  };

  attendance.forEach((item) => {
    switch (item.method) {
      case AttendanceMethod.FACE:
        summary.face++;
        break;

      case AttendanceMethod.BIOMETRIC:
        summary.biometric++;
        break;

      case AttendanceMethod.WEB:
        summary.web++;
        break;
    }
  });

  return summary;
};

// =========================================================
// ATTENDANCE PERCENTAGE
// =========================================================

const calculateAttendancePercentage = (
  present: number,
  late: number,
  total: number
) => {
  if (total === 0) {
    return 0;
  }

  const attended = present + late;

  return Number(
    ((attended / total) * 100).toFixed(2)
  );
};

// =========================================================
// GET ATTENDANCE DASHBOARD
// =========================================================

const getAttendanceDashboard = async (
  query: IAttendanceDashboardQuery
) => {
  // -------------------------------------------------------
  // Date
  // -------------------------------------------------------

  const selectedDate = query.date
    ? new Date(query.date)
    : new Date();

  const startOfDay =
    getStartOfDay(selectedDate);

  const endOfDay =
    getEndOfDay(selectedDate);

  // -------------------------------------------------------
  // DATE RANGE
  // -------------------------------------------------------

  const startDate = query.startDate
    ? getStartOfDay(
        new Date(query.startDate)
      )
    : startOfDay;

  const endDate = query.endDate
    ? getEndOfDay(
        new Date(query.endDate)
      )
    : endOfDay;

  // =======================================================
  // GET TOTAL PEOPLE
  // =======================================================

  const [
    totalStudents,
    totalTeachers,
    totalOfficials,
  ] = await Promise.all([
    prisma.student.count(),

    prisma.teacher.count(),

    prisma.official.count(),
  ]);

  // =======================================================
  // GET STUDENT ATTENDANCE
  // =======================================================

  const studentAttendance =
    await prisma.studentAttendance.findMany({
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

  const teacherAttendance =
    await prisma.teacherAttendance.findMany({
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

  const officialAttendance =
    await prisma.officialAttendance.findMany({
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

  const studentStatus =
    getStatusSummary(
      studentAttendance
    );

  const studentMethods =
    getMethodSummary(
      studentAttendance
    );

  const studentPercentage =
    calculateAttendancePercentage(
      studentStatus.present,
      studentStatus.late,
      totalStudents
    );

  // =======================================================
  // TEACHER SUMMARY
  // =======================================================

  const teacherStatus =
    getStatusSummary(
      teacherAttendance
    );

  const teacherMethods =
    getMethodSummary(
      teacherAttendance
    );

  const teacherPercentage =
    calculateAttendancePercentage(
      teacherStatus.present,
      teacherStatus.late,
      totalTeachers
    );

  // =======================================================
  // OFFICIAL SUMMARY
  // =======================================================

  const officialStatus =
    getStatusSummary(
      officialAttendance
    );

  const officialMethods =
    getMethodSummary(
      officialAttendance
    );

  const officialPercentage =
    calculateAttendancePercentage(
      officialStatus.present,
      officialStatus.late,
      totalOfficials
    );

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

    students: {
      ...studentStatus,

      attendancePercentage:
        studentPercentage,
    },

    teachers: {
      ...teacherStatus,

      attendancePercentage:
        teacherPercentage,
    },

    officials: {
      ...officialStatus,

      attendancePercentage:
        officialPercentage,
    },

    methods: {
      students: studentMethods,

      teachers: teacherMethods,

      officials: officialMethods,
    },

    recentAttendance: {
      students:
        studentAttendance.slice(0, 10),

      teachers:
        teacherAttendance.slice(0, 10),

      officials:
        officialAttendance.slice(0, 10),
    },
  };
};

// =========================================================
// TODAY'S ATTENDANCE
// =========================================================

const getTodayAttendance = async () => {
  return getAttendanceDashboard({
    date: new Date()
      .toISOString()
      .split("T")[0],
  });
};

// =========================================================
// EXPORT
// =========================================================

export const AttendanceDashboardService = {
  getAttendanceDashboard,
  getTodayAttendance,
};