import express from 'express';
import { ExpenseRoutes } from '../modules/Expenses/expense.routes';
import { adminRoutes } from '../modules/admin/admin.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { EntryFeesRoutes } from '../modules/entryFees/entryFees.routes';
import { RevenueRoutes } from '../modules/entryRevenue/entryRevenue.routes';
import { OfficialRoutes } from '../modules/official/official.routes';
import { StudentRoutes } from '../modules/student/student.routes';
import { TeacherRoutes } from '../modules/teacher/teacher.routes';
import { userRoutes } from '../modules/user/user.routes';
import { NewsRoutes } from '../modules/website/home/news/news.routes';
import { NoticeRoutes } from '../modules/website/home/notice/notice.routes';
import { RecentNewsRoutes } from '../modules/website/home/recentNews/recentNews.routes';

import { AppsAuthRoutes } from '../modules/apps/auth/apps.auth.route';
import { StudentFaceRegistrationRoutes } from '../modules/apps/studentFaceRegistration/student.face.registration.rotes';
import AttendanceDeviceRoutes from '../modules/attendence/attendanceDevice/attendenceDevice.routes';
import DashboardAttendanceRoutes from '../modules/attendence/dashboard/attendence.routes';
import OfficialAttendanceRoutes from '../modules/attendence/officialAttendance/officialAttendance.routes';
import { StudentAttendanceRoutes } from '../modules/attendence/studentAttendance/studentAttendance.routes';
import TeacherAttendanceRoutes from '../modules/attendence/teacherAttendance/teacherAttendance.routes';
import { SchoolHeaderRoutes } from '../modules/website/home/schoolHeader/schoolHeader.routes';
import { SchoolHistoryRoutes } from '../modules/website/home/schoolHistory/schoolHistory.route';
import { SchoolLeadershipRoutes } from '../modules/website/home/schoolLeadership/schoolLeadership.route';
import { SliderBannerRoutes } from '../modules/website/home/sliderBanner/sliderBanner.routes';

const router = express.Router();

const moduleRoutes: any[] = [
  // ... routes
  {
    path: '/student',
    route: StudentRoutes,
  },
  {
    path: '/student-attendance',
    route: StudentAttendanceRoutes,
  },
  {
    path: '/teacher-attendance',
    route: TeacherAttendanceRoutes,
  },
  {
    path: '/official-attendance',
    route: OfficialAttendanceRoutes,
  },
  {
    path: '/attendance-dashboard',
    route: DashboardAttendanceRoutes,
  },
  {
    path: '/attendance-device',
    route: AttendanceDeviceRoutes,
  },
  {
    path: '/teacher',
    route: TeacherRoutes,
  },
  {
    path: '/official',
    route: OfficialRoutes,
  },
  {
    path: '/entryFees',
    route: EntryFeesRoutes,
  },
  {
    path: '/expense',
    route: ExpenseRoutes,
  },
  {
    path: '/revenue',
    route: RevenueRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/admin',
    route: adminRoutes,
  },
  {
    path: '/news',
    route: NewsRoutes,
  },
   {
    path: '/notice',
    route: NoticeRoutes,
  },
  {
    path: '/recent-news',
    route: RecentNewsRoutes,
  },
  {
    path: '/school-header',
    route: SchoolHeaderRoutes,
  },
  {
    path: '/slider-banner',
    route: SliderBannerRoutes,
  },
  {
    path: '/school-history',
    route: SchoolHistoryRoutes,
  },
  {
    path: '/school-leadership',
    route: SchoolLeadershipRoutes,
  },
   {
    path: '/apps-auth',
    route: AppsAuthRoutes,
  },
   {
    path: '/student-face-registration',
    route: StudentFaceRegistrationRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
