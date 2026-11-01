import { AttendanceMethod, AttendanceStatus } from "@prisma/client";
import { Request, Response } from "express";
import catchAsync from "../../../../shared/catchAsync";
import sendResponse from "../../../../shared/sendResponse";
import { TeacherAttendanceService } from "./teacherAttendance.service";

// =========================================================
// CREATE
// =========================================================

const createTeacherAttendance = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await TeacherAttendanceService.createTeacherAttendance(
        req.body
      );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Teacher attendance created successfully",
      data: result,
    });
  }
);

// =========================================================
// GET ALL
// =========================================================

const getAllTeacherAttendance = catchAsync(
  async (req: Request, res: Response) => {
    const {
      teacherId,
      status,
      method,
      startDate,
      endDate,
    } = req.query;

    const result =
      await TeacherAttendanceService.getAllTeacherAttendance({
        teacherId: teacherId as string | undefined,
        status: status as AttendanceStatus | undefined,
        method: method as AttendanceMethod | undefined,
        startDate: startDate
          ? new Date(startDate as string)
          : undefined,
        endDate: endDate
          ? new Date(endDate as string)
          : undefined,
      });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Teacher attendance retrieved successfully",
      data: result,
    });
  }
);

// =========================================================
// GET SINGLE
// =========================================================

const getTeacherAttendanceById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result =
      await TeacherAttendanceService.getTeacherAttendanceById(
        id
      );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Teacher attendance retrieved successfully",
      data: result,
    });
  }
);

// =========================================================
// GET HISTORY
// =========================================================

const getTeacherAttendanceHistory = catchAsync(
  async (req: Request, res: Response) => {
    const { teacherId } = req.params;

    const { startDate, endDate } = req.query;

    const result =
      await TeacherAttendanceService.getTeacherAttendanceHistory(
        teacherId,
        startDate
          ? new Date(startDate as string)
          : undefined,
        endDate
          ? new Date(endDate as string)
          : undefined
      );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Teacher attendance history retrieved successfully",
      data: result,
    });
  }
);

// =========================================================
// UPDATE
// =========================================================

const updateTeacherAttendance = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result =
      await TeacherAttendanceService.updateTeacherAttendance(
        id,
        req.body
      );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Teacher attendance updated successfully",
      data: result,
    });
  }
);

// =========================================================
// DELETE
// =========================================================

const deleteTeacherAttendance = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result =
      await TeacherAttendanceService.deleteTeacherAttendance(
        id
      );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Teacher attendance deleted successfully",
      data: result,
    });
  }
);

// =========================================================
// CHECK-IN
// =========================================================

const teacherCheckIn = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await TeacherAttendanceService.teacherCheckIn(
        req.body
      );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Teacher checked in successfully",
      data: result,
    });
  }
);

// =========================================================
// CHECK-OUT
// =========================================================

const teacherCheckOut = catchAsync(
  async (req: Request, res: Response) => {
    const { teacherId } = req.body;

    const result =
      await TeacherAttendanceService.teacherCheckOut(
        teacherId
      );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Teacher checked out successfully",
      data: result,
    });
  }
);

export const TeacherAttendanceController = {
  createTeacherAttendance,
  getAllTeacherAttendance,
  getTeacherAttendanceById,
  getTeacherAttendanceHistory,
  updateTeacherAttendance,
  deleteTeacherAttendance,
  teacherCheckIn,
  teacherCheckOut,
};