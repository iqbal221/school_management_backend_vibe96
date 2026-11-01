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
exports.NoticeService = void 0;
const prisma_1 = require("../../../../../shared/prisma");
const createNotice = (_a) => __awaiter(void 0, [_a], void 0, function* ({ text, documentUrl, documentName, }) {
    const Notice = yield prisma_1.prisma.notice.create({
        data: {
            text: text.trim(),
            documentUrl: documentUrl !== null && documentUrl !== void 0 ? documentUrl : null,
            documentName: documentName !== null && documentName !== void 0 ? documentName : null,
        },
    });
    return Notice;
});
const getNotice = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.notice.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
});
const getNoticeById = (notice_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.notice.findUnique({
        where: {
            notice_id,
        },
    });
});
const updateNotice = (notice_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const Notice = yield prisma_1.prisma.notice.update({
        where: {
            notice_id,
        },
        data: Object.assign(Object.assign(Object.assign({}, (payload.text !== undefined && {
            text: payload.text.trim(),
        })), (payload.documentUrl !== undefined && {
            documentUrl: payload.documentUrl,
        })), (payload.documentName !== undefined && {
            documentName: payload.documentName,
        })),
    });
    return Notice;
});
const deleteNotice = (notice_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.notice.delete({
        where: {
            notice_id,
        },
    });
});
exports.NoticeService = {
    createNotice,
    getNotice,
    getNoticeById,
    updateNotice,
    deleteNotice,
};
