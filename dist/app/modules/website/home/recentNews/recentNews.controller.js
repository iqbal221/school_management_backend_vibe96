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
exports.RecentNewsController = void 0;
const recentNews_service_1 = require("./recentNews.service");
const createRecentNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text } = req.body;
        console.log('Rexen', text);
        if (typeof text !== 'string' || !text.trim()) {
            return res.status(400).json({
                success: false,
                message: 'News text is required',
            });
        }
        const news = yield recentNews_service_1.RecentNewsService.createRecentNews(text);
        console.log(news);
        return res.status(201).json({
            success: true,
            message: 'Recent news created successfully',
            data: news,
        });
    }
    catch (error) {
        console.error('Create Recent News Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to create recent news',
        });
    }
});
const getRecentNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const news = yield recentNews_service_1.RecentNewsService.getRecentNews();
        return res.status(200).json({
            success: true,
            message: 'Recent news retrieved successfully',
            data: news,
        });
    }
    catch (error) {
        console.error('Get Recent News Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve recent news',
        });
    }
});
const getRecentNewsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const news = yield recentNews_service_1.RecentNewsService.getRecentNewsById(id);
        if (!news) {
            return res.status(404).json({
                success: false,
                message: 'Recent news not found',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Recent news retrieved successfully',
            data: news,
        });
    }
    catch (error) {
        console.error('Get Recent News By ID Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve recent news',
        });
    }
});
const updateRecentNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { text, isActive, order } = req.body;
        if (text !== undefined) {
            if (typeof text !== 'string' || !text.trim()) {
                return res.status(400).json({
                    success: false,
                    message: 'News text cannot be empty',
                });
            }
        }
        if (isActive !== undefined && typeof isActive !== 'boolean') {
            return res.status(400).json({
                success: false,
                message: 'isActive must be a boolean',
            });
        }
        let parsedOrder;
        if (order !== undefined) {
            parsedOrder = Number(order);
            if (!Number.isInteger(parsedOrder) || parsedOrder < 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Order must be a non-negative integer',
                });
            }
        }
        const existingNews = yield recentNews_service_1.RecentNewsService.getRecentNewsById(id);
        if (!existingNews) {
            return res.status(404).json({
                success: false,
                message: 'Recent news not found',
            });
        }
        const news = yield recentNews_service_1.RecentNewsService.updateRecentNews(id, Object.assign(Object.assign(Object.assign({}, (text !== undefined && {
            text: text.trim(),
        })), (isActive !== undefined && {
            isActive,
        })), (parsedOrder !== undefined && {
            order: parsedOrder,
        })));
        return res.status(200).json({
            success: true,
            message: 'Recent news updated successfully',
            data: news,
        });
    }
    catch (error) {
        console.error('Update Recent News Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to update recent news',
        });
    }
});
const deleteRecentNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const existingNews = yield recentNews_service_1.RecentNewsService.getRecentNewsById(id);
        if (!existingNews) {
            return res.status(404).json({
                success: false,
                message: 'Recent news not found',
            });
        }
        yield recentNews_service_1.RecentNewsService.deleteRecentNews(id);
        return res.status(200).json({
            success: true,
            message: 'Recent news deleted successfully',
        });
    }
    catch (error) {
        console.error('Delete Recent News Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to delete recent news',
        });
    }
});
exports.RecentNewsController = {
    createRecentNews,
    getRecentNews,
    getRecentNewsById,
    updateRecentNews,
    deleteRecentNews,
};
