
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../../shared/catchAsync';
import sendResponse from '../../../../shared/sendResponse';
import { StudentFaceRegistrationService } from './student.face.registration.service';

const RegisterStudentFace = catchAsync(
  async (req: Request, res: Response) => {
    const result = await StudentFaceRegistrationService.RegisterStudentFace(
      req as any,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student face registered successfully',
      data: result,
    });
  },
);

const GetStudentFace = catchAsync(
  async (req: Request, res: Response) => {
    const { studentId } = req.params;

    const result =
      await StudentFaceRegistrationService.GetStudentFace(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student face data fetched successfully',
      data: result,
    });
  },
);

const DeleteStudentFace = catchAsync(
  async (req: Request, res: Response) => {
    const { studentId } = req.params;

    const result =
      await StudentFaceRegistrationService.DeleteStudentFace(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student face registration deleted successfully',
      data: result,
    });
  },
);

export const StudentFaceRegistrationController = {
  RegisterStudentFace,
  GetStudentFace,
  DeleteStudentFace,
};
