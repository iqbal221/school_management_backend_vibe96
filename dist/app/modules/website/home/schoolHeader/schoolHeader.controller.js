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
exports.SchoolHeaderController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../../../shared/sendResponse"));
const schoolHeader_service_1 = require("./schoolHeader.service");
const createSchoolHeader = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schoolHeader_service_1.SchoolHeaderService.createSchoolHeader(req);
    console.log('image', req.file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'School header created successfully',
        data: result,
    });
}));
const getSchoolHeaders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schoolHeader_service_1.SchoolHeaderService.getSchoolHeaders();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'School headers retrieved successfully',
        data: result,
    });
}));
const getActiveSchoolHeader = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schoolHeader_service_1.SchoolHeaderService.getActiveSchoolHeader();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Active school header retrieved successfully',
        data: result,
    });
}));
const getSchoolHeaderById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield schoolHeader_service_1.SchoolHeaderService.getSchoolHeaderById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'School header retrieved successfully',
        data: result,
    });
}));
const updateSchoolHeader = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schoolHeader_service_1.SchoolHeaderService.updateSchoolHeader(req);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'School header Updated',
        data: result,
    });
}));
const deleteSchoolHeader = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield schoolHeader_service_1.SchoolHeaderService.deleteSchoolHeader(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'School header deleted successfully',
        data: result,
    });
}));
exports.SchoolHeaderController = {
    createSchoolHeader,
    getSchoolHeaders,
    getActiveSchoolHeader,
    getSchoolHeaderById,
    updateSchoolHeader,
    deleteSchoolHeader,
};
