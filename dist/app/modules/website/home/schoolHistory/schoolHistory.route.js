"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolHistoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const schoolHistory_contoller_1 = require("./schoolHistory.contoller");
const router = express_1.default.Router();
router.post('/', schoolHistory_contoller_1.SchoolHistoryController.createSchoolHistory);
router.get('/', schoolHistory_contoller_1.SchoolHistoryController.getSchoolHistory);
router.put('/', schoolHistory_contoller_1.SchoolHistoryController.updateSchoolHistory);
exports.SchoolHistoryRoutes = router;
