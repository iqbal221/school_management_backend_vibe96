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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../../config"));
const ApiError_1 = __importDefault(require("../../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../../helpers/jwtHelpers");
const prisma_1 = require("../../../../shared/prisma");
// ======================================================
// REGISTER USER
// ======================================================
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, } = payload;
    console.log(name, email, password);
    // Validate required fields
    if (!name || !email || !password) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Name, email and password are required');
    }
    if (password.length < 6) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Password must be at least 6 characters');
    }
    // Check existing email
    const existingUser = yield prisma_1.prisma.appsUser.findUnique({
        where: {
            email: email.trim().toLowerCase(),
        },
    });
    if (existingUser) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'User with this email already exists');
    }
    // Hash password
    const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
    // Create user
    const user = yield prisma_1.prisma.appsUser.create({
        data: {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password: hashedPassword,
        },
    });
    return {
        user: {
            name: user.name,
            email: user.email,
        },
    };
});
// ======================================================
// LOGIN USER
// ======================================================
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, } = payload;
    console.log(email, password);
    const isUserExist = yield prisma_1.prisma.appsUser.findFirst({
        where: {
            email: email.trim().toLowerCase(),
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // Compare password
    const isPasswordMatch = yield bcryptjs_1.default.compare(password, isUserExist.password);
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid password');
    }
    // Create access token
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({
        email: isUserExist.email,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken,
    };
});
// ======================================================
// GET CURRENT USER
// ======================================================
const GetUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(userData === null || userData === void 0 ? void 0 : userData.email)) {
        return null;
    }
    const result = yield prisma_1.prisma.appsUser.findFirst({
        where: {
            email: userData.email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return result;
});
exports.AuthService = {
    registerUser,
    loginUser,
    GetUser,
};
