import { Request, Response } from "express";

import {
  AttendanceMethod,
  AttendanceStatus,
} from "@prisma/client";

import catchAsync from "../../../../shared/catchAsync";
import sendResponse from "../../../../shared/sendResponse";

import {
  OfficialAttendanceService,
} from "./officialAttendance.service";

// =========================================================
// CREATE
// =========================================================

const createOfficialAttendance = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
            console.log("controller",req.body)
    const result =
      await OfficialAttendanceService
        .createOfficialAttendance(
          req.body
        );



    sendResponse(res, {
      statusCode: 201,

      success: true,

      message:
        "Official attendance created successfully",

      data: result,
    });
  }
);

// =========================================================
// GET ALL
// =========================================================

const getAllOfficialAttendance = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const {
      officialId,
      status,
      method,
      startDate,
      endDate,
    } = req.query;

    const result =
      await OfficialAttendanceService
        .getAllOfficialAttendance({
          officialId:
            officialId as
              | string
              | undefined,

          status:
            status as
              | AttendanceStatus
              | undefined,

          method:
            method as
              | AttendanceMethod
              | undefined,

          startDate: startDate
            ? new Date(
                startDate as string
              )
            : undefined,

          endDate: endDate
            ? new Date(
                endDate as string
              )
            : undefined,
        });

    sendResponse(res, {
      statusCode: 200,

      success: true,

      message:
        "Official attendance retrieved successfully",

      data: result,
    });
  }
);

// =========================================================
// GET SINGLE
// =========================================================

const getOfficialAttendanceById =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {
      const { id } =
        req.params;

      const result =
        await OfficialAttendanceService
          .getOfficialAttendanceById(
            id
          );

      sendResponse(res, {
        statusCode: 200,

        success: true,

        message:
          "Official attendance retrieved successfully",

        data: result,
      });
    }
  );

// =========================================================
// GET HISTORY
// =========================================================

const getOfficialAttendanceHistory =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {
      const {
        officialId,
      } = req.params;

      const {
        startDate,
        endDate,
      } = req.query;

      const result =
        await OfficialAttendanceService
          .getOfficialAttendanceHistory(
            officialId,

            startDate
              ? new Date(
                  startDate as string
                )
              : undefined,

            endDate
              ? new Date(
                  endDate as string
                )
              : undefined
          );

      sendResponse(res, {
        statusCode: 200,

        success: true,

        message:
          "Official attendance history retrieved successfully",

        data: result,
      });
    }
  );

// =========================================================
// UPDATE
// =========================================================

const updateOfficialAttendance =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {
      const { id } =
        req.params;

      const result =
        await OfficialAttendanceService
          .updateOfficialAttendance(
            id,
            req.body
          );

      sendResponse(res, {
        statusCode: 200,

        success: true,

        message:
          "Official attendance updated successfully",

        data: result,
      });
    }
  );

// =========================================================
// DELETE
// =========================================================

const deleteOfficialAttendance =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {
      const { id } =
        req.params;

      const result =
        await OfficialAttendanceService
          .deleteOfficialAttendance(
            id
          );

      sendResponse(res, {
        statusCode: 200,

        success: true,

        message:
          "Official attendance deleted successfully",

        data: result,
      });
    }
  );

// =========================================================
// CHECK-IN
// =========================================================

const officialCheckIn =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {
      const result =
        await OfficialAttendanceService
          .officialCheckIn(
            req.body
          );

      sendResponse(res, {
        statusCode: 201,

        success: true,

        message:
          "Official checked in successfully",

        data: result,
      });
    }
  );

// =========================================================
// CHECK-OUT
// =========================================================

const officialCheckOut =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {
      const {
        officialId,
      } = req.body;

      const result =
        await OfficialAttendanceService
          .officialCheckOut(
            officialId
          );

      sendResponse(res, {
        statusCode: 200,

        success: true,

        message:
          "Official checked out successfully",

        data: result,
      });
    }
  );

// =========================================================
// EXPORT
// =========================================================

export const OfficialAttendanceController = {
  createOfficialAttendance,
  getAllOfficialAttendance,
  getOfficialAttendanceById,
  getOfficialAttendanceHistory,
  updateOfficialAttendance,
  deleteOfficialAttendance,
  officialCheckIn,
  officialCheckOut,
};