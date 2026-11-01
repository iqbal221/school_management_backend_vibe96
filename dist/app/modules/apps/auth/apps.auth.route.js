"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppsAuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const apps_auth_controller_1 = require("./apps.auth.controller");
const router = express_1.default.Router();
router.post('/register', apps_auth_controller_1.AuthController.registerUser);
router.post('/login', apps_auth_controller_1.AuthController.loginUser);
router.get('/', (0, auth_1.default)(), apps_auth_controller_1.AuthController.GetUser);
exports.AppsAuthRoutes = router;
