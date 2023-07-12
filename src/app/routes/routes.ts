import express from 'express';
import AcademicSemesterRoute from '../modules/academicSemester/academicSemester.route';
import UserRoutes from '../modules/user/user.route';

const router = express.Router();

router.use('/users', UserRoutes);
router.use('/academic_semesters', AcademicSemesterRoute);

const Routes = router;
export default Routes;
