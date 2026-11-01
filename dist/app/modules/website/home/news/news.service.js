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
exports.NewsService = void 0;
const prisma_1 = require("../../../../../shared/prisma");
const createNews = (_a) => __awaiter(void 0, [_a], void 0, function* ({ text, documentUrl, documentName, }) {
    const news = yield prisma_1.prisma.news.create({
        data: {
            text: text.trim(),
            documentUrl: documentUrl !== null && documentUrl !== void 0 ? documentUrl : null,
            documentName: documentName !== null && documentName !== void 0 ? documentName : null,
        },
    });
    return news;
});
const getNews = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.news.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
});
const getNewsById = (news_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.news.findUnique({
        where: {
            news_id,
        },
    });
});
const updateNews = (news_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const news = yield prisma_1.prisma.news.update({
        where: {
            news_id,
        },
        data: Object.assign(Object.assign(Object.assign({}, (payload.text !== undefined && {
            text: payload.text.trim(),
        })), (payload.documentUrl !== undefined && {
            documentUrl: payload.documentUrl,
        })), (payload.documentName !== undefined && {
            documentName: payload.documentName,
        })),
    });
    return news;
});
const deleteNews = (news_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.news.delete({
        where: {
            news_id,
        },
    });
});
exports.NewsService = {
    createNews,
    getNews,
    getNewsById,
    updateNews,
    deleteNews,
};
