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
exports.NewsController = void 0;
const news_service_1 = require("./news.service");
/* =========================================================
   CREATE NEWS
========================================================= */
const createNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text, documentUrl, documentName, } = req.body;
        console.log('News Text:', text);
        console.log('Document URL:', documentUrl);
        console.log('Document Name:', documentName);
        /* =====================================================
           VALIDATE TEXT
        ===================================================== */
        if (typeof text !== 'string' ||
            !text.trim()) {
            return res.status(400).json({
                success: false,
                message: 'News text is required',
            });
        }
        /* =====================================================
           VALIDATE DOCUMENT URL
        ===================================================== */
        if (documentUrl !== undefined &&
            documentUrl !== null &&
            typeof documentUrl !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Invalid document URL',
            });
        }
        /* =====================================================
           VALIDATE DOCUMENT NAME
        ===================================================== */
        if (documentName !== undefined &&
            documentName !== null &&
            typeof documentName !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Invalid document name',
            });
        }
        /* =====================================================
           CREATE
        ===================================================== */
        const news = yield news_service_1.NewsService.createNews({
            text: text.trim(),
            documentUrl: (documentUrl === null || documentUrl === void 0 ? void 0 : documentUrl.trim()) || null,
            documentName: (documentName === null || documentName === void 0 ? void 0 : documentName.trim()) || null,
        });
        console.log('Created News:', news);
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
/* =========================================================
   GET ALL NEWS
========================================================= */
const getNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const news = yield news_service_1.NewsService.getNews();
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
/* =========================================================
   GET NEWS BY ID
========================================================= */
const getNewsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const news = yield news_service_1.NewsService.getNewsById(id);
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
/* =========================================================
   UPDATE NEWS
========================================================= */
const updateNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { text, documentUrl, documentName, removeDocument, } = req.body;
        console.log('Update News ID:', id);
        console.log('Update News Text:', text);
        console.log('Update Document URL:', documentUrl);
        console.log('Update Document Name:', documentName);
        console.log('Update Remove Document:', removeDocument);
        /* =====================================================
           CHECK EXISTING NEWS
        ===================================================== */
        const existingNews = yield news_service_1.NewsService.getNewsById(id);
        if (!existingNews) {
            return res.status(404).json({
                success: false,
                message: 'Recent news not found',
            });
        }
        /* =====================================================
           VALIDATE TEXT
        ===================================================== */
        if (text !== undefined) {
            if (typeof text !== 'string' ||
                !text.trim()) {
                return res.status(400).json({
                    success: false,
                    message: 'News text cannot be empty',
                });
            }
        }
        /* =====================================================
           PARSE REMOVE DOCUMENT
        ===================================================== */
        const shouldRemoveDocument = removeDocument === true ||
            removeDocument === 'true';
        /* =====================================================
           UPDATE DATA
        ===================================================== */
        const updateData = {};
        /* =====================================================
           TEXT
        ===================================================== */
        if (text !== undefined) {
            updateData.text =
                text.trim();
        }
        /* =====================================================
           REMOVE DOCUMENT
        ===================================================== */
        if (shouldRemoveDocument) {
            updateData.documentUrl =
                null;
            updateData.documentName =
                null;
        }
        /* =====================================================
           NEW CLOUDINARY DOCUMENT
        ===================================================== */
        /*
         * If removeDocument is NOT true and a new
         * Cloudinary URL was provided, replace the
         * existing document.
         */
        if (!shouldRemoveDocument &&
            documentUrl !== undefined) {
            if (documentUrl !== null &&
                typeof documentUrl !== 'string') {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid document URL',
                });
            }
            updateData.documentUrl =
                (documentUrl === null || documentUrl === void 0 ? void 0 : documentUrl.trim()) || null;
            /*
             * If documentName is not provided,
             * keep the existing document name.
             */
            if (documentName !== undefined) {
                if (documentName !== null &&
                    typeof documentName !== 'string') {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid document name',
                    });
                }
                updateData.documentName =
                    (documentName === null || documentName === void 0 ? void 0 : documentName.trim()) || null;
            }
        }
        /* =====================================================
           DOCUMENT NAME WITHOUT URL
        ===================================================== */
        /*
         * Normally documentUrl and documentName
         * are sent together.
         *
         * This handles the case where only
         * documentName is provided.
         */
        if (!shouldRemoveDocument &&
            documentUrl === undefined &&
            documentName !== undefined) {
            if (documentName !== null &&
                typeof documentName !== 'string') {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid document name',
                });
            }
            updateData.documentName =
                (documentName === null || documentName === void 0 ? void 0 : documentName.trim()) || null;
        }
        console.log('Final News Update Data:', updateData);
        /* =====================================================
           UPDATE
        ===================================================== */
        const news = yield news_service_1.NewsService.updateNews(id, updateData);
        console.log('Updated News:', news);
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
/* =========================================================
   DELETE NEWS
========================================================= */
const deleteNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        /* =====================================================
           CHECK EXISTING NEWS
        ===================================================== */
        const existingNews = yield news_service_1.NewsService.getNewsById(id);
        if (!existingNews) {
            return res.status(404).json({
                success: false,
                message: 'Recent news not found',
            });
        }
        /* =====================================================
           DELETE
        ===================================================== */
        yield news_service_1.NewsService.deleteNews(id);
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
/* =========================================================
   EXPORT
========================================================= */
exports.NewsController = {
    createNews,
    getNews,
    getNewsById,
    updateNews,
    deleteNews,
};
