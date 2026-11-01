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
exports.SchoolHistoryController = void 0;
const schoolHistory_service_1 = require("./schoolHistory.service");
// =====================================
// Create School History
// =====================================
const createSchoolHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sectionTitle, aboutSchool } = req.body;
        // Validate section title
        if (typeof sectionTitle !== 'string' ||
            !sectionTitle.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Section title is required',
            });
        }
        // Validate about school
        if (typeof aboutSchool !== 'string' ||
            !aboutSchool.trim()) {
            return res.status(400).json({
                success: false,
                message: 'About school is required',
            });
        }
        // Check existing record
        const existing = yield schoolHistory_service_1.SchoolHistoryService.getSchoolHistory();
        if (existing) {
            return res.status(409).json({
                success: false,
                message: 'School history already exists. Please update the existing record.',
                data: existing,
            });
        }
        // Create
        const result = yield schoolHistory_service_1.SchoolHistoryService.createSchoolHistory({
            sectionTitle: sectionTitle.trim(),
            aboutSchool: aboutSchool.trim(),
        });
        return res.status(201).json({
            success: true,
            message: 'School history added successfully',
            data: result,
        });
    }
    catch (error) {
        console.error('Create School History Error:', error);
        return res.status(500).json({
            success: false,
            message: (error === null || error === void 0 ? void 0 : error.message) ||
                'Failed to add school history',
        });
    }
});
// =====================================
// Get School History
// =====================================
const getSchoolHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield schoolHistory_service_1.SchoolHistoryService.getSchoolHistory();
        return res.status(200).json({
            success: true,
            message: 'School history retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        console.error('Get School History Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve school history',
        });
    }
});
// =====================================
// Update School History
// =====================================
const updateSchoolHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sectionTitle, aboutSchool } = req.body;
        // Update
        const result = yield schoolHistory_service_1.SchoolHistoryService.updateSchoolHistory({
            sectionTitle: sectionTitle.trim(),
            aboutSchool: aboutSchool.trim(),
        });
        return res.status(200).json({
            success: true,
            message: 'School history updated successfully',
            data: result,
        });
    }
    catch (error) {
        console.error('Update School History Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to update school history',
        });
    }
});
// =====================================
// Export Controller
// =====================================
exports.SchoolHistoryController = {
    createSchoolHistory,
    getSchoolHistory,
    updateSchoolHistory,
};
