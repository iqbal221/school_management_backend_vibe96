import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../../../shared/catchAsync';
import sendResponse from '../../../../../shared/sendResponse';
import { SchoolLeadershipService } from './schoolLeadership.servicec';

/**
 * CREATE
 */
const createSchoolLeadership = catchAsync(async (req: Request, res: Response) => {
  const result = await SchoolLeadershipService.createSchoolLeadership(req as any);
  console.log('image', req.file);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'SchoolLeadership created successfully',
    data: result,
  });
});

/**
 * GET
 */
const getSchoolLeadership = async (
  req: Request,
  res: Response,
) => {
  try {
    const result =
      await SchoolLeadershipService.getSchoolLeadership();

    return res.status(200).json({
      success: true,
      message:
        'School leadership retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    console.error(
      'Get School Leadership Error:',
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        'Failed to retrieve school leadership',
    });
  }
};



/**
 * UPDATE
 */
const updateSchoolLeadership = catchAsync(async (req: Request, res: Response) => {
  const result = await SchoolLeadershipService.updateSchoolLeadership(req as any);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'School leadership Updated',
    data: result,
  });
});

/**
 * DELETE
 */
const deleteSchoolLeadership = async (
  req: Request,
  res: Response,
) => {
  try {
    const existing =
      await SchoolLeadershipService.getSchoolLeadership();

    if (!existing) {
      return res.status(404).json({
        success: false,
        message:
          'School leadership not found',
      });
    }

    await SchoolLeadershipService.deleteSchoolLeadership();

    return res.status(200).json({
      success: true,
      message:
        'School leadership deleted successfully',
      data: null,
    });
  } catch (error: any) {
    console.error(
      'Delete School Leadership Error:',
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        'Failed to delete school leadership',
    });
  }
};

export const SchoolLeadershipController = {
  getSchoolLeadership,
  createSchoolLeadership,
  updateSchoolLeadership,
  deleteSchoolLeadership,
};