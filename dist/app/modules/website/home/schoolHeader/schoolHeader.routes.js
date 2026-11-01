"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolHeaderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const FileUploadHelper_1 = require("../../../../../helpers/FileUploadHelper");
const schoolHeader_controller_1 = require("./schoolHeader.controller");
const router = express_1.default.Router();
// =========================================================
// CREATE SCHOOL HEADER
// =========================================================
router.post('/', FileUploadHelper_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    var _a;
    try {
        console.log('========== CREATE SCHOOL HEADER ==========');
        if ((_a = req.body) === null || _a === void 0 ? void 0 : _a.data) {
            req.body = JSON.parse(req.body.data);
        }
        // console.log('PARSED BODY:', req.body);
        return schoolHeader_controller_1.SchoolHeaderController.createSchoolHeader(req, res, next);
    }
    catch (error) {
        console.log(error);
    }
});
// =========================================================
// GET ALL SCHOOL HEADERS
// =========================================================
router.get('/', schoolHeader_controller_1.SchoolHeaderController.getSchoolHeaders);
// =========================================================
// GET ACTIVE SCHOOL HEADER
// =========================================================
router.get('/active', schoolHeader_controller_1.SchoolHeaderController.getActiveSchoolHeader);
// =========================================================
// GET SCHOOL HEADER BY ID
// =========================================================
router.get('/:id', schoolHeader_controller_1.SchoolHeaderController.getSchoolHeaderById);
// =========================================================
// UPDATE SCHOOL HEADER
// =========================================================
router.patch('/:id', FileUploadHelper_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    var _a;
    try {
        console.log('========== UPDATE SCHOOL HEADER ==========');
        if ((_a = req.body) === null || _a === void 0 ? void 0 : _a.data) {
            req.body = JSON.parse(req.body.data);
        }
        console.log('PARSED BODY:', req.body.data);
        return schoolHeader_controller_1.SchoolHeaderController.updateSchoolHeader(req, res, next);
    }
    catch (error) {
        return next(error);
    }
});
// =========================================================
// DELETE SCHOOL HEADER
// =========================================================
router.delete('/:id', schoolHeader_controller_1.SchoolHeaderController.deleteSchoolHeader);
exports.SchoolHeaderRoutes = router;
