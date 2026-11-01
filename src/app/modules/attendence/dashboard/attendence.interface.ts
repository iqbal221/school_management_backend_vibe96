
// =========================================================
// DATE RANGE
// =========================================================

export interface IAttendanceDashboardQuery {
  date?: string;
  startDate?: string;
  endDate?: string;
}

// =========================================================
// STATUS SUMMARY
// =========================================================

export interface IAttendanceStatusSummary {
  present: number;
  absent: number;
  late: number;
  leave: number;
  total: number;
}

// =========================================================
// METHOD SUMMARY
// =========================================================

export interface IAttendanceMethodSummary {
  face: number;
  biometric: number;
  web: number;
  total: number;
}

// =========================================================
// PERSON ATTENDANCE SUMMARY
// =========================================================

export interface IPersonAttendanceSummary
  extends IAttendanceStatusSummary {
  attendancePercentage: number;
}

// =========================================================
// DASHBOARD RESPONSE
// =========================================================

export interface IAttendanceDashboard {
  date: string;

  totals: {
    students: number;
    teachers: number;
    officials: number;
  };

  students: IPersonAttendanceSummary;

  teachers: IPersonAttendanceSummary;

  officials: IPersonAttendanceSummary;

  methods: {
    students: IAttendanceMethodSummary;
    teachers: IAttendanceMethodSummary;
    officials: IAttendanceMethodSummary;
  };

  recentAttendance: {
    students: any[];
    teachers: any[];
    officials: any[];
  };
}