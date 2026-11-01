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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const FileUploadHelper_1 = require("../../../helpers/FileUploadHelper");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../shared/prisma");
const student_constant_1 = require("./student.constant");
const InsertIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // =========================================================
        // 1. GET FILES
        // =========================================================
        const files = Array.isArray(req.files) ? req.files : [];
        console.log("========== CREATE STUDENT ==========");
        console.log("Body:", req.body);
        console.log("Files:", files);
        // =========================================================
        // 2. UPLOAD IMAGES TO CLOUDINARY
        // =========================================================
        const imageUrlList = [];
        for (const file of files) {
            if (!(file === null || file === void 0 ? void 0 : file.path)) {
                continue;
            }
            const uploadedImage = yield FileUploadHelper_1.FileUploadHelper.uploadToCloudinary(file.path);
            if (uploadedImage === null || uploadedImage === void 0 ? void 0 : uploadedImage.secure_url) {
                imageUrlList.push(uploadedImage.secure_url);
            }
        }
        // =========================================================
        // 3. COPY REQUEST BODY
        // =========================================================
        const data = Object.assign({}, req.body);
        // =========================================================
        // 4. VALIDATE DATE OF BIRTH
        // =========================================================
        if (data.dateOfBirth) {
            const dateObject = new Date(data.dateOfBirth);
            if (Number.isNaN(dateObject.getTime())) {
                throw new Error("Invalid dateOfBirth");
            }
            data.dateOfBirth = dateObject;
        }
        else {
            data.dateOfBirth = null;
        }
        // =========================================================
        // 5. ADD IMAGE URLS
        // =========================================================
        data.image = imageUrlList;
        console.log("Data before Prisma create:", data);
        // =========================================================
        // 6. CREATE STUDENT
        // =========================================================
        const result = yield prisma_1.prisma.student.create({
            data,
        });
        // =========================================================
        // 7. RETURN CREATED STUDENT
        // =========================================================
        console.log("Student created successfully:", result.id);
        return result;
    }
    catch (error) {
        console.error("========== CREATE STUDENT ERROR ==========");
        console.error(error);
        throw error;
    }
});
const UploadResult = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.studentResult.create({
        data,
    });
    return result;
});
const GetAllFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: student_constant_1.StudentSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length > 0) {
        andConditions.push({
            AND: Object.keys(filtersData).map(key => ({
                [key]: {
                    equals: filtersData[key],
                },
            })),
        });
    }
    const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.prisma.student.findMany({
        where: whereCondition,
        take: limit,
        skip,
        orderBy: sortBy && sortOrder
            ? {
                [sortBy]: sortOrder,
            }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.prisma.student.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const GetStudentResult = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.studentResult.findMany();
    return result;
});
const GetDataById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.student.findUnique({
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
            data.image = [uploadedImage.secure_url];
        }
    }
    if (data.dateOfBirth) {
        const dateObject = new Date(data.dateOfBirth);
        if (!isNaN(dateObject.getTime())) {
            data.dateOfBirth = dateObject;
        }
    }
    delete data.file;
    return yield prisma_1.prisma.student.update({
        where: {
            id,
        },
        data,
    });
});
const DeleteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.student.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.StudentService = {
    InsertIntoDB,
    UploadResult,
    GetAllFromDB,
    GetStudentResult,
    GetDataById,
    UpdateIntoDB,
    DeleteFromDB,
};
