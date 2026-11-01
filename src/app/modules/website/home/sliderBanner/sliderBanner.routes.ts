import express from 'express';

import { FileUploadHelper } from '../../../../../helpers/FileUploadHelper';
import { SliderBannerController } from './sliderBanner.controller';

const router = express.Router();

// =========================================================
// CREATE HERO SLIDER
// =========================================================

router.post(
  '/',
  FileUploadHelper.upload.single('file'),
  SliderBannerController.createSliderBanner
);

// =========================================================
// GET ALL HERO SLIDERS
// =========================================================

router.get('/', SliderBannerController.getSliderBanners);

// =========================================================
// GET HERO SLIDER BY ID
// =========================================================

router.get('/:id', SliderBannerController.getSliderBannerById);

// =========================================================
// UPDATE HERO SLIDER
// =========================================================

router.patch(
  '/:id',
  FileUploadHelper.upload.single('file'),
  SliderBannerController.updateSliderBanner
);

export const SliderBannerRoutes = router;
