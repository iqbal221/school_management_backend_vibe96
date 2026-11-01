import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AttendanceFilterableFields } from './attendence.constant';
import { AttendanceService } from './attendence.service';

const InsertStudentAttedanceIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AttendanceService.InsertStudentAttedanceIntoDB(
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student Attendence created ',
      data: result,
    });
  }
);

const InsertTeacherAttedanceIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AttendanceService.InsertTeacherAttendanceIntoDB(
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Teacher Attendence created ',
      data: result,
    });
  }
);

const InsertOfficialAttedanceIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AttendanceService.InsertOfficialAttendanceIntoDB(
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Official Attendence created ',
      data: result,
    });
  }
);

const GetStudentAttedanceFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, AttendanceFilterableFields);
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

    const result = await AttendanceService.GetStudentAttedanceFromDB(
      filters,
      options
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student Attendance Data fetched',
      meta: result.meta,
      data: result.data,
    });
  }
);

const GetTeacherAttedanceFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, AttendanceFilterableFields);
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

    const result = await AttendanceService.GetTeacherAttedanceFromDB(
      filters,
      options
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Teacher Attendance Data fetched',
      meta: result.meta,
      data: result.data,
    });
  }
);

const GetOfficialAttedanceFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, AttendanceFilterableFields);
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

    const result = await AttendanceService.GetOfficialAttedanceFromDB(
      filters,
      options
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Official Attendance Data fetched',
      meta: result.meta,
      data: result.data,
    });
  }
);

export const AttendanceController = {
  InsertStudentAttedanceIntoDB,
  InsertTeacherAttedanceIntoDB,
  InsertOfficialAttedanceIntoDB,
  GetStudentAttedanceFromDB,
  GetTeacherAttedanceFromDB,
  GetOfficialAttedanceFromDB,
};
