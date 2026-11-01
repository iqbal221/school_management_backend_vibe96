import { Request, Response } from "express";

import catchAsync from "../../../../shared/catchAsync";
import sendResponse from "../../../../shared/sendResponse";
import { AttendanceDashboardService } from "./attendence.service";



// =========================================================
// GET ATTENDANCE DASHBOARD
// =========================================================

const getAttendanceDashboard =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {
      const result =
        await AttendanceDashboardService
          .getAttendanceDashboard(
            req.query
          );

      sendResponse(res, {
        statusCode: 200,

        success: true,

        message:
          "Attendance dashboard data retrieved successfully",

        data: result,
      });
    }
  );

// =========================================================
// GET TODAY ATTENDANCE
// =========================================================

const getTodayAttendance =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {
      const result =
        await AttendanceDashboardService
          .getTodayAttendance();

      sendResponse(res, {
        statusCode: 200,

        success: true,

        message:
          "Today's attendance retrieved successfully",

        data: result,
      });
    }
  );

// =========================================================
// EXPORT
// =========================================================

export const AttendanceDashboardController = {
  getAttendanceDashboard,
  getTodayAttendance,
};