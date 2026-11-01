"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliderBannerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const FileUploadHelper_1 = require("../../../../../helpers/FileUploadHelper");
const sliderBanner_controller_1 = require("./sliderBanner.controller");
const router = express_1.default.Router();
// =========================================================
// CREATE HERO SLIDER
// =========================================================
router.post('/', FileUploadHelper_1.FileUploadHelper.upload.single('file'), sliderBanner_controller_1.SliderBannerController.createSliderBanner);
// =========================================================
// GET ALL HERO SLIDERS
// =========================================================
router.get('/', sliderBanner_controller_1.SliderBannerController.getSliderBanners);
// =========================================================
// GET HERO SLIDER BY ID
// =========================================================
router.get('/:id', sliderBanner_controller_1.SliderBannerController.getSliderBannerById);
// =========================================================
// UPDATE HERO SLIDER
// =========================================================
router.patch('/:id', FileUploadHelper_1.FileUploadHelper.upload.single('file'), sliderBanner_controller_1.SliderBannerController.updateSliderBanner);
exports.SliderBannerRoutes = router;
