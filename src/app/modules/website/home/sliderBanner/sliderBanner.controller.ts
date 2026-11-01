import { Request, Response } from 'express';
import catchAsync from '../../../../../shared/catchAsync';
import sendResponse from '../../../../../shared/sendResponse';
import { SliderBannerService } from './sliderBanner.service';

// =========================================================
// CREATE HERO SLIDER
// =========================================================

const createSliderBanner = catchAsync(async (req: Request, res: Response) => {
  console.log('========== CREATE HERO SLIDER ==========');

  console.log('BODY:', req.body);
  console.log('FILE:', req.file);

  // -------------------------------------------------------
  // Parse body
  // -------------------------------------------------------

  let data: {
    isActive?: boolean;
  } = {};

  if (req.body?.data) {
    try {
      data =
        typeof req.body.data === 'string'
          ? JSON.parse(req.body.data)
          : req.body.data;
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid JSON data',
      });
    }
  } else {
    data = req.body || {};
  }

  // -------------------------------------------------------
  // Service
  // -------------------------------------------------------

  const result = await SliderBannerService.createSliderBanner(data, req.file);

  // -------------------------------------------------------
  // Response
  // -------------------------------------------------------

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Hero slider created successfully',
    data: result,
  });
});

// =========================================================
// GET HERO SLIDERS
// =========================================================

const getSliderBanners = catchAsync(async (req: Request, res: Response) => {
  const result = await SliderBannerService.getSliderBanners();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Hero sliders retrieved successfully',
    data: result,
  });
});

// =========================================================
// GET HERO SLIDER BY ID
// =========================================================

const getSliderBannerById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await SliderBannerService.getSliderBannerById(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Hero slider retrieved successfully',
    data: result,
  });
});

// =========================================================
// UPDATE HERO SLIDER
// =========================================================

const updateSliderBanner = catchAsync(async (req: Request, res: Response) => {
  console.log('========== UPDATE HERO SLIDER ==========');

  console.log('PARAMS:', req.params);
  console.log('BODY:', req.body);
  console.log('FILE:', req.file);

  const { id } = req.params;

  // -------------------------------------------------------
  // Parse body
  // -------------------------------------------------------

  let data: {
    isActive?: boolean;
  } = {};

  if (req.body?.data) {
    try {
      data =
        typeof req.body.data === 'string'
          ? JSON.parse(req.body.data)
          : req.body.data;
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid JSON data',
      });
    }
  } else {
    data = req.body || {};
  }

  // -------------------------------------------------------
  // Service
  // -------------------------------------------------------

  const result = await SliderBannerService.updateSliderBanner(
    id,
    data,
    req.file
  );

  // -------------------------------------------------------
  // Response
  // -------------------------------------------------------

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Hero slider updated successfully',
    data: result,
  });
});

export const SliderBannerController = {
  createSliderBanner,
  getSliderBanners,
  getSliderBannerById,
  updateSliderBanner,
};
