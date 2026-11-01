import { PrismaClient, SliderBanner } from '@prisma/client';
import httpStatus from 'http-status';

import ApiError from '../../../../../errors/ApiError';
import { FileUploadHelper } from '../../../../../helpers/FileUploadHelper';

const prisma = new PrismaClient();

// =========================================================
// CREATE HERO SLIDER
// Only image + isActive
// =========================================================

const createSliderBanner = async (
  data: {
    isActive?: boolean;
  },
  file?: Express.Multer.File
): Promise<SliderBanner> => {
  // -------------------------------------------------------
  // Image is required when creating
  // -------------------------------------------------------

  if (!file) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Slider image is required');
  }

  // -------------------------------------------------------
  // Upload image
  // -------------------------------------------------------

  const uploadedImage = await FileUploadHelper.uploadToCloudinary(file.buffer);

  if (!uploadedImage?.secure_url) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to upload slider image'
    );
  }

  // -------------------------------------------------------
  // Create database record
  // -------------------------------------------------------

  const result = await prisma.sliderBanner.create({
    data: {
      image: uploadedImage.secure_url,
      isActive: data.isActive ?? true,
    },
  });

  return result;
};

// =========================================================
// GET HERO SLIDERS
// =========================================================

const getSliderBanners = async (): Promise<SliderBanner[]> => {
  const result = await prisma.sliderBanner.findMany({
    orderBy: {
      createdAt: 'asc',
    },
  });

  return result;
};

// =========================================================
// GET HERO SLIDER BY ID
// =========================================================

const getSliderBannerById = async (id: string): Promise<SliderBanner> => {
  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Slider ID is required');
  }

  const result = await prisma.sliderBanner.findUnique({
    where: {
      id,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Hero slider not found');
  }

  return result;
};

// =========================================================
// UPDATE HERO SLIDER IMAGE
// Only image + isActive
// =========================================================

const updateSliderBanner = async (
  id: string,
  data: {
    isActive?: boolean;
  },
  file?: Express.Multer.File
): Promise<SliderBanner> => {
  // -------------------------------------------------------
  // Validate ID
  // -------------------------------------------------------

  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Slider ID is required');
  }

  // -------------------------------------------------------
  // Find existing slider
  // -------------------------------------------------------

  const existing = await prisma.sliderBanner.findUnique({
    where: {
      id,
    },
  });

  if (!existing) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Hero slider not found');
  }

  // -------------------------------------------------------
  // Keep existing image if no new image is uploaded
  // -------------------------------------------------------

  let image = existing.image;

  // -------------------------------------------------------
  // Upload new image
  // -------------------------------------------------------

  if (file) {
    const uploadedImage = await FileUploadHelper.uploadToCloudinary(
      file.buffer
    );

    if (!uploadedImage?.secure_url) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to upload new slider image'
      );
    }

    image = uploadedImage.secure_url;
  }

  // -------------------------------------------------------
  // Update database
  // -------------------------------------------------------

  const result = await prisma.sliderBanner.update({
    where: {
      id,
    },

    data: {
      image,

      isActive: data.isActive !== undefined ? data.isActive : existing.isActive,
    },
  });

  return result;
};

export const SliderBannerService = {
  createSliderBanner,
  getSliderBanners,
  getSliderBannerById,
  updateSliderBanner,
};
