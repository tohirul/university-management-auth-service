import express from 'express';
import AcademicDepartmentRoutes from '../modules/academicDepartment/academicDepartment.route';
import AcademicFacultyRoutes from '../modules/academicFaculty/academicFaculty.route';
import AcademicSemesterRoutes from '../modules/academicSemester/academicSemester.route';
import AdminRoutes from '../modules/admin/admin.route';
import AuthRoutes from '../modules/auth/auth.route';
import FacultyRoutes from '../modules/faculty/faculty.route';
import ManagementDepartmentRoutes from '../modules/managementDepartment/managementDepartment.route';
import StudentRoutes from '../modules/student/student.route';
import UserRoutes from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic_semester',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic_faculty',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic_department',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/managementDepartment',
    route: ManagementDepartmentRoutes,
  },
  {
    path: '/student',
    route: StudentRoutes,
  },
  {
    path: '/faculty',
    route: FacultyRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

for (const { path, route } of moduleRoutes) {
  router.use(path, route);
}

const Routes = router;
export default Routes;
