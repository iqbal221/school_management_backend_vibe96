import { Request, Response } from 'express';

import httpStatus from 'http-status';
import catchAsync from '../../../../../shared/catchAsync';
import sendResponse from '../../../../../shared/sendResponse';
import { SchoolHeaderService } from './schoolHeader.service';
const createSchoolHeader = catchAsync(async (req: Request, res: Response) => {
  const result = await SchoolHeaderService.createSchoolHeader(req as any);
  console.log('image', req.file);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'School header created successfully',
    data: result,
  });
});

const getSchoolHeaders = catchAsync(async (req: Request, res: Response) => {
  const result = await SchoolHeaderService.getSchoolHeaders();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'School headers retrieved successfully',
    data: result,
  });
});

const getActiveSchoolHeader = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SchoolHeaderService.getActiveSchoolHeader();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Active school header retrieved successfully',
      data: result,
    });
  }
);

const getSchoolHeaderById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await SchoolHeaderService.getSchoolHeaderById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'School header retrieved successfully',
    data: result,
  });
});

const updateSchoolHeader = catchAsync(async (req: Request, res: Response) => {
  const result = await SchoolHeaderService.updateSchoolHeader(req as any);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'School header Updated',
    data: result,
  });
});

const deleteSchoolHeader = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await SchoolHeaderService.deleteSchoolHeader(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'School header deleted successfully',
    data: result,
  });
});

export const SchoolHeaderController = {
  createSchoolHeader,
  getSchoolHeaders,
  getActiveSchoolHeader,
  getSchoolHeaderById,
  updateSchoolHeader,
  deleteSchoolHeader,
};
