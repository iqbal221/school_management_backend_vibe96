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
exports.SchoolLeadershipController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../../../shared/sendResponse"));
const schoolLeadership_servicec_1 = require("./schoolLeadership.servicec");
/**
 * CREATE
 */
const createSchoolLeadership = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schoolLeadership_servicec_1.SchoolLeadershipService.createSchoolLeadership(req);
    console.log('image', req.file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'SchoolLeadership created successfully',
        data: result,
    });
}));
/**
 * GET
 */
const getSchoolLeadership = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield schoolLeadership_servicec_1.SchoolLeadershipService.getSchoolLeadership();
        return res.status(200).json({
            success: true,
            message: 'School leadership retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        console.error('Get School Leadership Error:', error);
        return res.status(500).json({
            success: false,
            message: (error === null || error === void 0 ? void 0 : error.message) ||
                'Failed to retrieve school leadership',
        });
    }
});
/**
 * UPDATE
 */
const updateSchoolLeadership = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schoolLeadership_servicec_1.SchoolLeadershipService.updateSchoolLeadership(req);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'School leadership Updated',
        data: result,
    });
}));
/**
 * DELETE
 */
const deleteSchoolLeadership = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existing = yield schoolLeadership_servicec_1.SchoolLeadershipService.getSchoolLeadership();
        if (!existing) {
            return res.status(404).json({
                success: false,
                message: 'School leadership not found',
            });
        }
        yield schoolLeadership_servicec_1.SchoolLeadershipService.deleteSchoolLeadership();
        return res.status(200).json({
            success: true,
            message: 'School leadership deleted successfully',
            data: null,
        });
    }
    catch (error) {
        console.error('Delete School Leadership Error:', error);
        return res.status(500).json({
            success: false,
            message: (error === null || error === void 0 ? void 0 : error.message) ||
                'Failed to delete school leadership',
        });
    }
});
exports.SchoolLeadershipController = {
    getSchoolLeadership,
    createSchoolLeadership,
    updateSchoolLeadership,
    deleteSchoolLeadership,
};
