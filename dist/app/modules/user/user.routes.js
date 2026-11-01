"use strict";
// import express, { NextFunction, Request, Response } from 'express';
// import { ENUM_USER_ROLE } from '../../../enums/user';
// import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
// import auth from '../../middlewares/auth';
// import { UserController } from './user.controller';
// import { UserValidation } from './user.validations';
// import { StudentController } from '../student/student.controller';
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
exports.userRoutes = void 0;
// const router = express.Router();
// router.post(
//   '/',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN),
//   FileUploadHelper.upload.array('file', 4),
//   (req: Request, res: Response, next: NextFunction) => {
//     console.log('routes', req.body.data);
//     req.body = UserValidation.createUser.parse(JSON.parse(req.body.data));
//     return UserController.InsertIntoDB(req, res, next);
//   }
// );
// router.get('/:id', UserController.getByIdFromDB);
// router.patch(
//   '/:id',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   FileUploadHelper.upload.single('file'),
//   (req: Request, res: Response, next: NextFunction) => {
//     // Parse JSON data coming from FormData
//     if (req.body.data) {
//       req.body = UserValidation.update.parse(JSON.parse(req.body.data));
//     }
//     return UserController.UpdateIntoDB(req, res, next);
//   }
// );
// router.delete(
//   '/:id',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   UserController.deleteByIdFromDB
// );
// router.get('/', UserController.getAllFromDB);
// export const userRoutes = router;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const FileUploadHelper_1 = require("../../../helpers/FileUploadHelper");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_controller_1 = require("./user.controller");
const user_validations_1 = require("./user.validations");
const router = express_1.default.Router();
/* =========================================================
   CREATE USER
========================================================= */
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), 
// Upload profile image
FileUploadHelper_1.FileUploadHelper.upload.single('file'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Request body:', req.body);
        console.log('Uploaded file:', req.file);
        // FormData sends JSON as string
        if (!req.body.data) {
            return res.status(400).json({
                success: false,
                message: 'User data is required',
            });
        }
        // Parse JSON
        const parsedData = JSON.parse(req.body.data);
        // Validate JSON data
        req.body = user_validations_1.UserValidation.createUser.parse(parsedData);
        // File remains available as req.file
        return user_controller_1.UserController.InsertIntoDB(req, res, next);
    }
    catch (error) {
        return next(error);
    }
}));
/* =========================================================
   GET USER BY ID
========================================================= */
router.get('/:id', user_controller_1.UserController.getByIdFromDB);
/* =========================================================
   UPDATE USER
========================================================= */
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), 
// Upload ONE profile image
FileUploadHelper_1.FileUploadHelper.upload.single('file'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Update body:', req.body);
        console.log('Update file:', req.file);
        /*
         * FormData:
         *
         * data -> JSON string
         * file -> profile image
         */
        if (!req.body.data) {
            return res.status(400).json({
                success: false,
                message: 'User data is required',
            });
        }
        // Convert JSON string to object
        const parsedData = JSON.parse(req.body.data);
        // Validate using Zod
        const validatedData = user_validations_1.UserValidation.updateUser.parse(parsedData);
        /*
         * Replace req.body with validated data.
         *
         * req.file is NOT removed.
         * Multer stores it separately in req.file.
         */
        req.body = validatedData;
        return user_controller_1.UserController.updateOneInDB(req, res, next);
    }
    catch (error) {
        return next(error);
    }
}));
/* =========================================================
   DELETE USER
========================================================= */
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.deleteByIdFromDB);
/* =========================================================
   GET ALL USERS
========================================================= */
router.get('/', user_controller_1.UserController.getAllFromDB);
exports.userRoutes = router;
