"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecentNewsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const recentNews_controller_1 = require("./recentNews.controller");
const router = express_1.default.Router();
router.post('/', recentNews_controller_1.RecentNewsController.createRecentNews);
router.get('/', recentNews_controller_1.RecentNewsController.getRecentNews);
router.get('/:id', recentNews_controller_1.RecentNewsController.getRecentNewsById);
router.patch('/:id', recentNews_controller_1.RecentNewsController.updateRecentNews);
router.delete('/:id', recentNews_controller_1.RecentNewsController.deleteRecentNews);
exports.RecentNewsRoutes = router;
