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
exports.SchoolHistoryService = void 0;
const prisma_1 = require("../../../../../shared/prisma");
// =====================================
// Create School History
// =====================================
const createSchoolHistory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield prisma_1.prisma.schoolHistory.findFirst();
    if (existing) {
        throw new Error('School history already exists. Please update the existing record.');
    }
    const result = yield prisma_1.prisma.schoolHistory.create({
        data: {
            sectionTitle: data.sectionTitle,
            aboutSchool: data.aboutSchool,
        },
    });
    return result;
});
// =====================================
// Get School History
// =====================================
const getSchoolHistory = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.schoolHistory.findFirst({
        orderBy: {
            createdAt: 'asc',
        },
    });
    return result;
});
// =====================================
// Update School History
// =====================================
const updateSchoolHistory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield prisma_1.prisma.schoolHistory.findFirst({
        orderBy: {
            createdAt: 'asc',
        },
    });
    console.log('Existing School History:', existing);
    if (!existing) {
        throw new Error('School history not found. Please add school history first.');
    }
    const result = yield prisma_1.prisma.schoolHistory.update({
        where: {
            id: existing.id,
        },
        data: {
            sectionTitle: data.sectionTitle,
            aboutSchool: data.aboutSchool,
        },
    });
    return result;
});
exports.SchoolHistoryService = {
    createSchoolHistory,
    getSchoolHistory,
    updateSchoolHistory,
};
