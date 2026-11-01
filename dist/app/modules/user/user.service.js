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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const FileUploadHelper_1 = require("../../../helpers/FileUploadHelper");
const prisma_1 = require("../../../shared/prisma");
const InsertIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    const imageUrlList = [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i].path;
        const uploadedImage = yield FileUploadHelper_1.FileUploadHelper.uploadToCloudinary(file);
        imageUrlList.push((uploadedImage === null || uploadedImage === void 0 ? void 0 : uploadedImage.secure_url) || '');
    }
    const data = req.body;
    console.log('hello', data);
    data.profileImage = imageUrlList;
    if (data.dateOfBirth) {
        const dateString = data.dateOfBirth;
        const dateObject = new Date(dateString);
        // Convert the date object to ISO format
        const isoString = dateObject.toISOString();
        data.dateOfBirth = isoString;
    }
    const result = yield prisma_1.prisma.user.create({
        data,
    });
    return result;
});
const getAllFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.user.findMany();
    return result;
});
const getByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.user.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const UpdateIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    console.log('Update data:', data);
    console.log('Uploaded file:', req.file);
    // Only update image when a new image is selected
    if (req.file) {
        const uploadedImage = yield FileUploadHelper_1.FileUploadHelper.uploadToCloudinary(req.file.buffer);
        if (uploadedImage === null || uploadedImage === void 0 ? void 0 : uploadedImage.secure_url) {
            data.profileImage = [uploadedImage.secure_url];
        }
    }
    if (data.dateOfBirth) {
        const dateObject = new Date(data.dateOfBirth);
        if (!isNaN(dateObject.getTime())) {
            data.dateOfBirth = dateObject;
        }
    }
    delete data.file;
    return yield prisma_1.prisma.user.update({
        where: {
            id,
        },
        data,
    });
});
const deleteByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.user.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.UserService = {
    InsertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    UpdateIntoDB,
    deleteByIdFromDB,
};
