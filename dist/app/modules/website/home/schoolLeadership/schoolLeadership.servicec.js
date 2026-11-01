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
exports.SchoolLeadershipService = void 0;
const prisma_1 = require("../../../../../shared/prisma");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../../../errors/ApiError"));
const FileUploadHelper_1 = require("../../../../../helpers/FileUploadHelper");
/**
 * Create School Leadership
 */
const createSchoolLeadership = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { founderName, principalName } = req.body;
    console.log('========== CREATE SCHOOL LEADERSHIP ==========');
    console.log('BODY:', req.body);
    console.log('FILES:', req.files);
    // =========================================
    // VALIDATE TEXT
    // =========================================
    if (!(founderName === null || founderName === void 0 ? void 0 : founderName.trim())) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Founder name is required');
    }
    if (!(principalName === null || principalName === void 0 ? void 0 : principalName.trim())) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Principal name is required');
    }
    // =========================================
    // GET FILES
    // =========================================
    const files = req.files;
    const founderFile = (_a = files === null || files === void 0 ? void 0 : files.founderImage) === null || _a === void 0 ? void 0 : _a[0];
    const principalFile = (_b = files === null || files === void 0 ? void 0 : files.principalImage) === null || _b === void 0 ? void 0 : _b[0];
    // =========================================
    // VALIDATE FOUNDER FILE
    // =========================================
    if (!founderFile) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Founder image is required');
    }
    // =========================================
    // VALIDATE PRINCIPAL FILE
    // =========================================
    if (!principalFile) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Principal image is required');
    }
    // =========================================
    // UPLOAD FOUNDER IMAGE
    // =========================================
    console.log('Uploading founder:', founderFile.originalname);
    const founderUpload = yield FileUploadHelper_1.FileUploadHelper.uploadToCloudinary(founderFile.buffer);
    console.log('Founder Cloudinary result:', founderUpload);
    if (!(founderUpload === null || founderUpload === void 0 ? void 0 : founderUpload.secure_url)) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Founder image upload failed');
    }
    const founderImage = founderUpload.secure_url;
    // =========================================
    // UPLOAD PRINCIPAL IMAGE
    // =========================================
    console.log('Uploading principal:', principalFile.originalname);
    const principalUpload = yield FileUploadHelper_1.FileUploadHelper.uploadToCloudinary(principalFile.buffer);
    console.log('Principal Cloudinary result:', principalUpload);
    if (!(principalUpload === null || principalUpload === void 0 ? void 0 : principalUpload.secure_url)) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Principal image upload failed');
    }
    const principalImage = principalUpload.secure_url;
    // =========================================
    // IMPORTANT DEBUG
    // =========================================
    console.log('========== CLOUDINARY URLS ==========');
    console.log('Founder Image:', founderImage);
    console.log('Principal Image:', principalImage);
    // =========================================
    // DATABASE
    // =========================================
    const result = yield prisma_1.prisma.schoolLeadership.create({
        data: {
            founderName: founderName.trim(),
            principalName: principalName.trim(),
            founderImage: founderImage,
            principalImage: principalImage,
        },
    });
    console.log('School leadership created:', result);
    return result;
});
/**
 * Get School Leadership

 */
const getSchoolLeadership = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.schoolLeadership.findFirst({
        orderBy: {
            createdAt: 'asc',
        },
    });
    return result;
});
/**
 * Update School Leadership
 *
 * Images are optional during update.
 * If a new image is not provided,
 * the existing image remains unchanged.
 */
const updateSchoolLeadership = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { id } = req.params;
    const data = req.body;
    console.log("========== UPDATE SCHOOL LEADERSHIP SERVICE ==========");
    console.log("ID:", id);
    console.log("Update data:", data);
    console.log("Files:", req.files);
    // --------------------------------------------------
    // Find existing record
    // --------------------------------------------------
    const existing = yield prisma_1.prisma.schoolLeadership.findUnique({
        where: {
            id,
        },
    });
    if (!existing) {
        throw new Error("School leadership not found.");
    }
    // --------------------------------------------------
    // Get uploaded files
    // --------------------------------------------------
    const files = req.files;
    const founderImage = (_a = files === null || files === void 0 ? void 0 : files.founderImage) === null || _a === void 0 ? void 0 : _a[0];
    const principalImage = (_b = files === null || files === void 0 ? void 0 : files.principalImage) === null || _b === void 0 ? void 0 : _b[0];
    console.log("Founder image:", founderImage
        ? {
            name: founderImage.originalname,
            type: founderImage.mimetype,
            size: founderImage.size,
        }
        : null);
    console.log("Principal image:", principalImage
        ? {
            name: principalImage.originalname,
            type: principalImage.mimetype,
            size: principalImage.size,
        }
        : null);
    // --------------------------------------------------
    // Founder image upload
    // --------------------------------------------------
    if (founderImage) {
        const uploadedFounderImage = yield FileUploadHelper_1.FileUploadHelper.uploadToCloudinary(founderImage.buffer);
        console.log("Uploaded founder image:", uploadedFounderImage);
        if (uploadedFounderImage === null || uploadedFounderImage === void 0 ? void 0 : uploadedFounderImage.secure_url) {
            data.founderImage =
                uploadedFounderImage.secure_url;
        }
    }
    // --------------------------------------------------
    // Principal image upload
    // --------------------------------------------------
    if (principalImage) {
        const uploadedPrincipalImage = yield FileUploadHelper_1.FileUploadHelper.uploadToCloudinary(principalImage.buffer);
        console.log("Uploaded principal image:", uploadedPrincipalImage);
        if (uploadedPrincipalImage === null || uploadedPrincipalImage === void 0 ? void 0 : uploadedPrincipalImage.secure_url) {
            data.principalImage =
                uploadedPrincipalImage.secure_url;
        }
    }
    // --------------------------------------------------
    // Update database
    // --------------------------------------------------
    return yield prisma_1.prisma.schoolLeadership.update({
        where: {
            id,
        },
        data,
    });
});
/**
 * Delete School Leadership
 */
const deleteSchoolLeadership = () => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield getSchoolLeadership();
    if (!existing) {
        throw new Error('School leadership not found.');
    }
    const result = yield prisma_1.prisma.schoolLeadership.delete({
        where: {
            id: existing.id,
        },
    });
    return result;
});
exports.SchoolLeadershipService = {
    getSchoolLeadership,
    createSchoolLeadership,
    updateSchoolLeadership,
    deleteSchoolLeadership,
};
