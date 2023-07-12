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

const AcademicSemesterRoute = router;
export default AcademicSemesterRoute;
