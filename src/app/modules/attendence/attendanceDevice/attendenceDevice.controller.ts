import { Request, Response } from "express";

import {
  AttendanceDeviceType,
} from "@prisma/client";

import catchAsync from "../../../../shared/catchAsync";
import sendResponse from "../../../../shared/sendResponse";

import {
  AttendanceDeviceService,
} from "./attendenceDevice.service";

// =========================================================
// CREATE
// =========================================================

const createAttendanceDevice =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {
      const result =
        await AttendanceDeviceService
          .createAttendanceDevice(
            req.body
          );

      sendResponse(res, {
        statusCode: 201,
        success: true,

        message:
          "Attendance device created successfully",

        data: result,
      });
    }
  );

// =========================================================
// GET ALL
// =========================================================

const getAllAttendanceDevices =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {
      const {
        searchTerm,
        type,
        isActive,
        schoolId,
      } = req.query;

      let activeValue:
        | boolean
        | undefined;

      if (isActive !== undefined) {
        activeValue =
          String(isActive) === "true";
      }

      const result =
        await AttendanceDeviceService
          .getAllAttendanceDevices({
            searchTerm:
              searchTerm as
                | string
                | undefined,

            type:
              type as
                | AttendanceDeviceType
                | undefined,

            isActive:
              activeValue,

            schoolId:
              schoolId as
                | string
                | undefined,
          });

      sendResponse(res, {
        statusCode: 200,
        success: true,

        message:
          "Attendance devices retrieved successfully",

        data: result,
      });
    }
  );

// =========================================================
// GET ACTIVE DEVICES
// =========================================================

const getActiveAttendanceDevices =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {
      const {
        schoolId,
      } = req.query;

      const result =
        await AttendanceDeviceService
          .getActiveAttendanceDevices(
            schoolId as
              | string
              | undefined
          );

      sendResponse(res, {
        statusCode: 200,
        success: true,

        message:
          "Active attendance devices retrieved successfully",

        data: result,
      });
    }
  );

// =========================================================
// GET BY ID
// =========================================================

const getAttendanceDeviceById =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {
      const { id } =
        req.params;

      const result =
        await AttendanceDeviceService
          .getAttendanceDeviceById(
            id
          );

      sendResponse(res, {
        statusCode: 200,
        success: true,

        message:
          "Attendance device retrieved successfully",

        data: result,
      });
    }
  );

// =========================================================
// GET BY DEVICE CODE
// =========================================================

const getAttendanceDeviceByDeviceCode =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {
      const {
        deviceCode,
      } = req.params;

      const result =
        await AttendanceDeviceService
          .getAttendanceDeviceByDeviceCode(
            deviceCode
          );

      sendResponse(res, {
        statusCode: 200,
        success: true,

        message:
          "Attendance device retrieved successfully",

        data: result,
      });
    }
  );

// =========================================================
// UPDATE
// =========================================================

const updateAttendanceDevice =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {
      const { id } =
        req.params;

      const result =
        await AttendanceDeviceService
          .updateAttendanceDevice(
            id,
            req.body
          );

      sendResponse(res, {
        statusCode: 200,
        success: true,

        message:
          "Attendance device updated successfully",

        data: result,
      });
    }
  );

// =========================================================
// DELETE
// =========================================================

const deleteAttendanceDevice =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {
      const { id } =
        req.params;

      const result =
        await AttendanceDeviceService
          .deleteAttendanceDevice(
            id
          );

      sendResponse(res, {
        statusCode: 200,
        success: true,

        message:
          "Attendance device deleted successfully",

        data: result,
      });
    }
  );

// =========================================================
// ACTIVATE
// =========================================================

const activateAttendanceDevice =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {
      const { id } =
        req.params;

      const result =
        await AttendanceDeviceService
          .activateAttendanceDevice(
            id
          );

      sendResponse(res, {
        statusCode: 200,
        success: true,

        message:
          "Attendance device activated successfully",

        data: result,
      });
    }
  );

// =========================================================
// DEACTIVATE
// =========================================================

const deactivateAttendanceDevice =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {
      const { id } =
        req.params;

      const result =
        await AttendanceDeviceService
          .deactivateAttendanceDevice(
            id
          );

      sendResponse(res, {
        statusCode: 200,
        success: true,

        message:
          "Attendance device deactivated successfully",

        data: result,
      });
    }
  );

// =========================================================
// HEARTBEAT
// =========================================================

const attendanceDeviceHeartbeat =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {
      const {
        deviceCode,
      } = req.body;

      const result =
        await AttendanceDeviceService
          .attendanceDeviceHeartbeat(
            deviceCode
          );

      sendResponse(res, {
        statusCode: 200,
        success: true,

        message:
          "Attendance device heartbeat updated successfully",

        data: result,
      });
    }
  );

// =========================================================
// EXPORT
// =========================================================

export const AttendanceDeviceController = {
  createAttendanceDevice,

  getAllAttendanceDevices,

  getActiveAttendanceDevices,

  getAttendanceDeviceById,

  getAttendanceDeviceByDeviceCode,

  updateAttendanceDevice,

  deleteAttendanceDevice,

  activateAttendanceDevice,

  deactivateAttendanceDevice,

  attendanceDeviceHeartbeat,
};