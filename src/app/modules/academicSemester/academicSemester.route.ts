import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import AcademicSemesterController from './academicSemester.controller';
import AcademicSemesterZodValidation from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create_semester',
  validateRequest(
    AcademicSemesterZodValidation.createAcademicSemesterZodValidationSchema
  ),
  AcademicSemesterController.createSemester
);

router.patch(
  '/:id',
  validateRequest(
    AcademicSemesterZodValidation.updateAcademicSemesterZodValidationSchema
  ),
  AcademicSemesterController.updateSemester
);

router.get('/', AcademicSemesterController.getAllSemesters);
router.get('/:id', AcademicSemesterController.getSingleSemester);

router.delete('/:id', AcademicSemesterController.deleteSemester);

const AcademicSemesterRoutes = router;
export default AcademicSemesterRoutes;
