"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliderBannerController = void 0;
const catchAsync_1 = __importDefault(require("../../../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../../../shared/sendResponse"));
const sliderBanner_service_1 = require("./sliderBanner.service");
// =========================================================
// CREATE HERO SLIDER
// =========================================================
const createSliderBanner = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log('========== CREATE HERO SLIDER ==========');
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);
    // -------------------------------------------------------
    // Parse body
    // -------------------------------------------------------
    let data = {};
    if ((_a = req.body) === null || _a === void 0 ? void 0 : _a.data) {
        try {
            data =
                typeof req.body.data === 'string'
                    ? JSON.parse(req.body.data)
                    : req.body.data;
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: 'Invalid JSON data',
            });
        }
    }
    else {
        data = req.body || {};
    }
    // -------------------------------------------------------
    // Service
    // -------------------------------------------------------
    const result = yield sliderBanner_service_1.SliderBannerService.createSliderBanner(data, req.file);
    // -------------------------------------------------------
    // Response
    // -------------------------------------------------------
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Hero slider created successfully',
        data: result,
    });
}));
// =========================================================
// GET HERO SLIDERS
// =========================================================
const getSliderBanners = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sliderBanner_service_1.SliderBannerService.getSliderBanners();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Hero sliders retrieved successfully',
        data: result,
    });
}));
// =========================================================
// GET HERO SLIDER BY ID
// =========================================================
const getSliderBannerById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield sliderBanner_service_1.SliderBannerService.getSliderBannerById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Hero slider retrieved successfully',
        data: result,
    });
}));
// =========================================================
// UPDATE HERO SLIDER
// =========================================================
const updateSliderBanner = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log('========== UPDATE HERO SLIDER ==========');
    console.log('PARAMS:', req.params);
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);
    const { id } = req.params;
    // -------------------------------------------------------
    // Parse body
    // -------------------------------------------------------
    let data = {};
    if ((_a = req.body) === null || _a === void 0 ? void 0 : _a.data) {
        try {
            data =
                typeof req.body.data === 'string'
                    ? JSON.parse(req.body.data)
                    : req.body.data;
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: 'Invalid JSON data',
            });
        }
    }
    else {
        data = req.body || {};
    }
    // -------------------------------------------------------
    // Service
    // -------------------------------------------------------
    const result = yield sliderBanner_service_1.SliderBannerService.updateSliderBanner(id, data, req.file);
    // -------------------------------------------------------
    // Response
    // -------------------------------------------------------
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Hero slider updated successfully',
        data: result,
    });
}));
exports.SliderBannerController = {
    createSliderBanner,
    getSliderBanners,
    getSliderBannerById,
    updateSliderBanner,
};
