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
exports.SliderBannerService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../../../errors/ApiError"));
const FileUploadHelper_1 = require("../../../../../helpers/FileUploadHelper");
const prisma = new client_1.PrismaClient();
// =========================================================
// CREATE HERO SLIDER
// Only image + isActive
// =========================================================
const createSliderBanner = (data, file) => __awaiter(void 0, void 0, void 0, function* () {
    // -------------------------------------------------------
    // Image is required when creating
    // -------------------------------------------------------
    var _a;
    if (!file) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Slider image is required');
    }
    // -------------------------------------------------------
    // Upload image
    // -------------------------------------------------------
    const uploadedImage = yield FileUploadHelper_1.FileUploadHelper.uploadToCloudinary(file.buffer);
    if (!(uploadedImage === null || uploadedImage === void 0 ? void 0 : uploadedImage.secure_url)) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to upload slider image');
    }
    // -------------------------------------------------------
    // Create database record
    // -------------------------------------------------------
    const result = yield prisma.sliderBanner.create({
        data: {
            image: uploadedImage.secure_url,
            isActive: (_a = data.isActive) !== null && _a !== void 0 ? _a : true,
        },
    });
    return result;
});
// =========================================================
// GET HERO SLIDERS
// =========================================================
const getSliderBanners = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.sliderBanner.findMany({
        orderBy: {
            createdAt: 'asc',
        },
    });
    return result;
});
// =========================================================
// GET HERO SLIDER BY ID
// =========================================================
const getSliderBannerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Slider ID is required');
    }
    const result = yield prisma.sliderBanner.findUnique({
        where: {
            id,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Hero slider not found');
    }
    return result;
});
// =========================================================
// UPDATE HERO SLIDER IMAGE
// Only image + isActive
// =========================================================
const updateSliderBanner = (id, data, file) => __awaiter(void 0, void 0, void 0, function* () {
    // -------------------------------------------------------
    // Validate ID
    // -------------------------------------------------------
    if (!id) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Slider ID is required');
    }
    // -------------------------------------------------------
    // Find existing slider
    // -------------------------------------------------------
    const existing = yield prisma.sliderBanner.findUnique({
        where: {
            id,
        },
    });
    if (!existing) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Hero slider not found');
    }
    // -------------------------------------------------------
    // Keep existing image if no new image is uploaded
    // -------------------------------------------------------
    let image = existing.image;
    // -------------------------------------------------------
    // Upload new image
    // -------------------------------------------------------
    if (file) {
        const uploadedImage = yield FileUploadHelper_1.FileUploadHelper.uploadToCloudinary(file.buffer);
        if (!(uploadedImage === null || uploadedImage === void 0 ? void 0 : uploadedImage.secure_url)) {
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to upload new slider image');
        }
        image = uploadedImage.secure_url;
    }
    // -------------------------------------------------------
    // Update database
    // -------------------------------------------------------
    const result = yield prisma.sliderBanner.update({
        where: {
            id,
        },
        data: {
            image,
            isActive: data.isActive !== undefined ? data.isActive : existing.isActive,
        },
    });
    return result;
});
exports.SliderBannerService = {
    createSliderBanner,
    getSliderBanners,
    getSliderBannerById,
    updateSliderBanner,
};
