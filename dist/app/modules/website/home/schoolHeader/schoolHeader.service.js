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
exports.SchoolHeaderService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../../../errors/ApiError"));
const FileUploadHelper_1 = require("../../../../../helpers/FileUploadHelper");
const prisma = new client_1.PrismaClient();
// =========================================================
// CREATE SCHOOL HEADER
// =========================================================
const createSchoolHeader = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { schoolName, slogan, isActive } = req.body;
    console.log('Create school header data:', req.body);
    console.log('Uploaded file:', req.file);
    // =========================================
    // VALIDATE
    // =========================================
    if (!(schoolName === null || schoolName === void 0 ? void 0 : schoolName.trim())) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'School name is required');
    }
    // =========================================
    // LOGO
    // =========================================
    let logo = [];
    if (req.file) {
        console.log('Uploading logo:', req.file.originalname);
        const uploadedImage = yield FileUploadHelper_1.FileUploadHelper.uploadToCloudinary(req.file.buffer);
        console.log('Cloudinary response:', uploadedImage);
        if (uploadedImage === null || uploadedImage === void 0 ? void 0 : uploadedImage.secure_url) {
            logo = [uploadedImage.secure_url];
        }
    }
    // =========================================
    // DATABASE
    // =========================================
    const result = yield prisma.schoolHeader.create({
        data: {
            schoolName: schoolName.trim(),
            slogan: (slogan === null || slogan === void 0 ? void 0 : slogan.trim()) || null,
            isActive: isActive !== undefined ? Boolean(isActive) : true,
            logo,
        },
    });
    return result;
});
const getSchoolHeaders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.schoolHeader.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
    return result;
});
const getSchoolHeaderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.schoolHeader.findUnique({
        where: {
            id,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'School header not found');
    }
    return result;
});
const getActiveSchoolHeader = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.schoolHeader.findFirst({
        where: {
            isActive: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return result;
});
const updateSchoolHeader = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    console.log('Update data:', data, req.file, id);
    // Only update image when a new image is selected
    if (req.file) {
        const uploadedImage = yield FileUploadHelper_1.FileUploadHelper.uploadToCloudinary(req.file.buffer);
        if (uploadedImage === null || uploadedImage === void 0 ? void 0 : uploadedImage.secure_url) {
            data.logo = [uploadedImage.secure_url];
        }
    }
    return yield prisma.schoolHeader.update({
        where: {
            id,
        },
        data,
    });
});
const deleteSchoolHeader = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield prisma.schoolHeader.findUnique({
        where: {
            id,
        },
    });
    if (!existing) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'School header not found');
    }
    const result = yield prisma.schoolHeader.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.SchoolHeaderService = {
    createSchoolHeader,
    getSchoolHeaders,
    getSchoolHeaderById,
    getActiveSchoolHeader,
    updateSchoolHeader,
    deleteSchoolHeader,
};
