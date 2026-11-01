"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const FileUploadHelper_1 = require("../../../helpers/FileUploadHelper");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const teacher_controller_1 = require("./teacher.controller");
const teacher_validation_1 = require("./teacher.validation");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), FileUploadHelper_1.FileUploadHelper.upload.array('file', 4), (req, res, next) => {
    console.log(req.body.data);
    req.body = teacher_validation_1.TeacherValidation.create.parse(JSON.parse(req.body.data));
    return teacher_controller_1.TeacherController.InsertIntoDB(req, res, next);
});
router.get('/:id', teacher_controller_1.TeacherController.GetDataById);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), teacher_controller_1.TeacherController.UpdateIntoDB);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), teacher_controller_1.TeacherController.DeleteFromDB);
router.get('/', teacher_controller_1.TeacherController.GetAllFromDB);
exports.TeacherRoutes = router;
