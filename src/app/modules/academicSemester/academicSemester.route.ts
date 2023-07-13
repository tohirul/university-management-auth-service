import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import AcademicSemesterController from './academicSemester.controller';
import AcademicSemesterValidation from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create_semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
);

router.get('/', AcademicSemesterController.getAllSemesters);
router.get('/:id', AcademicSemesterController.getSingleSemester);

const AcademicSemesterRoutes = router;
export default AcademicSemesterRoutes;
