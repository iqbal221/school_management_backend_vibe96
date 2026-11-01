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
exports.RecentNewsService = void 0;
const prisma_1 = require("../../../../../shared/prisma");
const createRecentNews = (text) => __awaiter(void 0, void 0, void 0, function* () {
    const lastNews = yield prisma_1.prisma.recentNews.findFirst({
        orderBy: {
            order: 'desc',
        },
    });
    const news = yield prisma_1.prisma.recentNews.create({
        data: {
            text: text.trim(),
            order: lastNews ? lastNews.order + 1 : 0,
        },
    });
    return news;
});
const getRecentNews = () => __awaiter(void 0, void 0, void 0, function* () {
    const news = yield prisma_1.prisma.recentNews.findMany({
        where: {
            isActive: true,
        },
        orderBy: {
            order: 'asc',
        },
    });
    return news;
});
const getRecentNewsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const news = yield prisma_1.prisma.recentNews.findUnique({
        where: {
            id,
        },
    });
    return news;
});
const updateRecentNews = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const news = yield prisma_1.prisma.recentNews.update({
        where: {
            id,
        },
        data: Object.assign(Object.assign(Object.assign({}, (payload.text !== undefined && {
            text: payload.text.trim(),
        })), (payload.isActive !== undefined && {
            isActive: payload.isActive,
        })), (payload.order !== undefined && {
            order: payload.order,
        })),
    });
    return news;
});
const deleteRecentNews = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const news = yield prisma_1.prisma.recentNews.delete({
        where: {
            id,
        },
    });
    return news;
});
exports.RecentNewsService = {
    createRecentNews,
    getRecentNews,
    getRecentNewsById,
    updateRecentNews,
    deleteRecentNews,
};
