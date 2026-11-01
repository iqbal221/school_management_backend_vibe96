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
exports.OfficialService = void 0;
const FileUploadHelper_1 = require("../../../helpers/FileUploadHelper");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../shared/prisma");
const official_constant_1 = require("./official.constant");
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
    data.image = imageUrlList;
    // Insert data into the database
    const result = yield prisma_1.prisma.official.create({
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
            OR: official_constant_1.OfficialSearchableFields.map(field => ({
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
    const result = yield prisma_1.prisma.official.findMany({
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
    const total = yield prisma_1.prisma.official.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const GetDataById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.official.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const UpdateIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    if (data.dateOfBirth) {
        const dateString = data === null || data === void 0 ? void 0 : data.dateOfBirth;
        const dateObject = new Date(dateString);
        // Convert the date object to ISO format
        const isoString = dateObject.toISOString();
        data.dateOfBirth = isoString;
    }
    const result = yield prisma_1.prisma.official.update({
        where: {
            id,
        },
        data,
    });
    return result;
});
const DeleteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.official.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.OfficialService = {
    InsertIntoDB,
    GetAllFromDB,
    GetDataById,
    UpdateIntoDB,
    DeleteFromDB,
};
