"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expense_routes_1 = require("../modules/Expenses/expense.routes");
const admin_routes_1 = require("../modules/admin/admin.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const entryFees_routes_1 = require("../modules/entryFees/entryFees.routes");
const entryRevenue_routes_1 = require("../modules/entryRevenue/entryRevenue.routes");
const official_routes_1 = require("../modules/official/official.routes");
const student_routes_1 = require("../modules/student/student.routes");
const teacher_routes_1 = require("../modules/teacher/teacher.routes");
const user_routes_1 = require("../modules/user/user.routes");
const news_routes_1 = require("../modules/website/home/news/news.routes");
const notice_routes_1 = require("../modules/website/home/notice/notice.routes");
const recentNews_routes_1 = require("../modules/website/home/recentNews/recentNews.routes");
const apps_auth_route_1 = require("../modules/apps/auth/apps.auth.route");
const attendenceDevice_routes_1 = __importDefault(require("../modules/attendence/attendanceDevice/attendenceDevice.routes"));
const attendence_routes_1 = __importDefault(require("../modules/attendence/dashboard/attendence.routes"));
const officialAttendance_routes_1 = __importDefault(require("../modules/attendence/officialAttendance/officialAttendance.routes"));
const studentAttendance_routes_1 = require("../modules/attendence/studentAttendance/studentAttendance.routes");
const teacherAttendance_routes_1 = __importDefault(require("../modules/attendence/teacherAttendance/teacherAttendance.routes"));
const schoolHeader_routes_1 = require("../modules/website/home/schoolHeader/schoolHeader.routes");
const schoolHistory_route_1 = require("../modules/website/home/schoolHistory/schoolHistory.route");
const schoolLeadership_route_1 = require("../modules/website/home/schoolLeadership/schoolLeadership.route");
const sliderBanner_routes_1 = require("../modules/website/home/sliderBanner/sliderBanner.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/student',
        route: student_routes_1.StudentRoutes,
    },
    {
        path: '/student-attendance',
        route: studentAttendance_routes_1.StudentAttendanceRoutes,
    },
    {
        path: '/teacher-attendance',
        route: teacherAttendance_routes_1.default,
    },
    {
        path: '/official-attendance',
        route: officialAttendance_routes_1.default,
    },
    {
        path: '/attendance-dashboard',
        route: attendence_routes_1.default,
    },
    {
        path: '/attendance-device',
        route: attendenceDevice_routes_1.default,
    },
    {
        path: '/teacher',
        route: teacher_routes_1.TeacherRoutes,
    },
    {
        path: '/official',
        route: official_routes_1.OfficialRoutes,
    },
    {
        path: '/entryFees',
        route: entryFees_routes_1.EntryFeesRoutes,
    },
    {
        path: '/expense',
        route: expense_routes_1.ExpenseRoutes,
    },
    {
        path: '/revenue',
        route: entryRevenue_routes_1.RevenueRoutes,
    },
    {
        path: '/auth',
        route: auth_routes_1.authRoutes,
    },
    {
        path: '/apps-auth',
        route: apps_auth_route_1.AppsAuthRoutes,
    },
    {
        path: '/user',
        route: user_routes_1.userRoutes,
    },
    {
        path: '/admin',
        route: admin_routes_1.adminRoutes,
    },
    {
        path: '/news',
        route: news_routes_1.NewsRoutes,
    },
    {
        path: '/notice',
        route: notice_routes_1.NoticeRoutes,
    },
    {
        path: '/recent-news',
        route: recentNews_routes_1.RecentNewsRoutes,
    },
    {
        path: '/school-header',
        route: schoolHeader_routes_1.SchoolHeaderRoutes,
    },
    {
        path: '/slider-banner',
        route: sliderBanner_routes_1.SliderBannerRoutes,
    },
    {
        path: '/school-history',
        route: schoolHistory_route_1.SchoolHistoryRoutes,
    },
    {
        path: '/school-leadership',
        route: schoolLeadership_route_1.SchoolLeadershipRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
