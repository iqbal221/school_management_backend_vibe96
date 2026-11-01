import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { EntryFeesFilterableFields } from './entryFees.constant';
import { EntryFeesService } from './entryFees.service';

const InsertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await EntryFeesService.InsertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Entry Fees created successfully',
    data: result,
  });
});

const GetAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, EntryFeesFilterableFields);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

  const result = await EntryFeesService.GetAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Entry Fees fetched',
    meta: result.meta,
    data: result.data,
  });
});

const GetDataById = async (req: Request, res: Response) => {
  console.log(req.params.id);
  const result = await EntryFeesService.GetDataById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Entry Fees  fetched',
    data: result,
  });
};

const UpdateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await EntryFeesService.UpdateIntoDB(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Entry Fees Updated',
    data: result,
  });
});

const DeleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await EntryFeesService.DeleteFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Entry Fees Deleted',
    data: result,
  });
});

// .............Authorization................
const InsertAuthorizationIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const result = await EntryFeesService.InsertAuthorizationIntoDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Authorization created successfully',
      data: result,
    });
  }
);

const GetAuthorizationFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const result = await EntryFeesService.GetAuthorizationFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Authorization data fetched',
      data: result,
    });
  }
);

const UpdateAuthorizationIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    console.log(payload);
    const result = await EntryFeesService.UpdateAuthorizationIntoDB(
      id,
      payload
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Authorization data updated',
      data: result,
    });
  }
);

export const EntryFeesController = {
  InsertIntoDB,
  InsertAuthorizationIntoDB,
  GetAllFromDB,
  GetDataById,
  UpdateIntoDB,
  DeleteFromDB,
  GetAuthorizationFromDB,
  UpdateAuthorizationIntoDB,
};
