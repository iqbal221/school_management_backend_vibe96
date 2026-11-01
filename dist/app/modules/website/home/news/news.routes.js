"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const news_controller_1 = require("./news.controller");
const router = express_1.default.Router();
router.post('/', news_controller_1.NewsController.createNews);
router.get('/', news_controller_1.NewsController.getNews);
router.get('/:id', news_controller_1.NewsController.getNewsById);
router.put('/:id', news_controller_1.NewsController.updateNews);
router.delete('/:id', news_controller_1.NewsController.deleteNews);
exports.NewsRoutes = router;
