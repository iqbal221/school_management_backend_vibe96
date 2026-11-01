"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolLeadershipRoutes = void 0;
const express_1 = __importDefault(require("express"));
const FileUploadHelper_1 = require("../../../../../helpers/FileUploadHelper");
const schoolLeadership_controller_1 = require("./schoolLeadership.controller");
const router = express_1.default.Router();
// =========================================================
// CREATE SCHOOL HEADER
// =========================================================
router.post('/', FileUploadHelper_1.FileUploadHelper.upload.fields([
    {
        name: 'founderImage',
        maxCount: 1,
    },
    {
        name: 'principalImage',
        maxCount: 1,
    },
]), (req, res, next) => {
    var _a;
    try {
        console.log('========== CREATE SCHOOL LEADERSHIP ==========');
        console.log('BODY BEFORE PARSE:', req.body);
        console.log('FILES:', req.files);
        if ((_a = req.body) === null || _a === void 0 ? void 0 : _a.data) {
            req.body = JSON.parse(req.body.data);
        }
        console.log('BODY AFTER PARSE:', req.body);
        return schoolLeadership_controller_1.SchoolLeadershipController.createSchoolLeadership(req, res, next);
    }
    catch (error) {
        console.error('CREATE SCHOOL LEADERSHIP ERROR:', error);
        next(error);
    }
});
// =========================================================
// GET ALL SCHOOL HEADERS
// =========================================================
router.get('/', schoolLeadership_controller_1.SchoolLeadershipController.getSchoolLeadership);
// =========================================================
// UPDATE SCHOOL HEADER
// =========================================================
// UPDATE SCHOOL LEADERSHIP
// =========================================================
router.patch('/:id', FileUploadHelper_1.FileUploadHelper.upload.fields([
    {
        name: 'founderImage',
        maxCount: 1,
    },
    {
        name: 'principalImage',
        maxCount: 1,
    },
]), (req, res, next) => {
    var _a;
    try {
        console.log('========== UPDATE SCHOOL LEADERSHIP ==========');
        console.log('BODY BEFORE PARSE:', req.body);
        console.log('FILES:', req.files);
        // =========================================
        // PARSE JSON DATA
        // =========================================
        if ((_a = req.body) === null || _a === void 0 ? void 0 : _a.data) {
            req.body = JSON.parse(req.body.data);
        }
        console.log('BODY AFTER PARSE:', req.body);
        console.log('FILES AFTER PARSE:', req.files);
        return schoolLeadership_controller_1.SchoolLeadershipController.updateSchoolLeadership(req, res, next);
    }
    catch (error) {
        console.error('UPDATE SCHOOL LEADERSHIP ERROR:', error);
        next(error);
    }
});
// =========================================================
// DELETE SCHOOL HEADER
// =========================================================
router.delete('/:id', schoolLeadership_controller_1.SchoolLeadershipController.deleteSchoolLeadership);
exports.SchoolLeadershipRoutes = router;
