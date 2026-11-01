"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfficialRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const FileUploadHelper_1 = require("../../../helpers/FileUploadHelper");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const official_controller_1 = require("./official.controller");
const official_validation_1 = require("./official.validation");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), FileUploadHelper_1.FileUploadHelper.upload.array('file', 4), (req, res, next) => {
    console.log(req.body.data);
    req.body = official_validation_1.OfficialValidation.create.parse(JSON.parse(req.body.data));
    return official_controller_1.OfficialController.InsertIntoDB(req, res, next);
});
router.get('/:id', official_controller_1.OfficialController.GetDataById);
router.patch('/:id', (0, validateRequest_1.default)(official_validation_1.OfficialValidation.update), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), official_controller_1.OfficialController.UpdateIntoDB);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), official_controller_1.OfficialController.DeleteFromDB);
router.get('/', official_controller_1.OfficialController.GetAllFromDB);
exports.OfficialRoutes = router;
