import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import AcademicFacultyController from './academicFaculty.controller';
import AcademicFacultyValidation from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create_faculty',
  validateRequest(AcademicFacultyValidation.createFacultyZodValidationSchema),
  AcademicFacultyController.createFaculty
);

router.get('/', AcademicFacultyController.getAllAcademicFaculties);
router.get('/:id', AcademicFacultyController.getFaculty);

router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updatefacultyZodValidationSchema),
  AcademicFacultyController.updateFaculty
);
router.delete('/:id', AcademicFacultyController.deleteFaculty);

const AcademicFacultyRoutes = router;
export default AcademicFacultyRoutes;
