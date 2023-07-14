import express from 'express';
import AcademicFacultyRoutes from '../modules/academicFaculty/academicFaculty.route';
import AcademicSemesterRoutes from '../modules/academicSemester/academicSemester.route';
import UserRoutes from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic_semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic_faculty',
    route: AcademicFacultyRoutes,
  },
];

for (const { path, route } of moduleRoutes) {
  router.use(path, route);
}

// router.use('/users', UserRoutes);

const Routes = router;
export default Routes;
