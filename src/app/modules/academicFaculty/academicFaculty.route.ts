import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import AcademicFacultyController from './academicFaculty.controller';
import AcademicFacultyZodValidation from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create_faculty',
  validateRequest(
    AcademicFacultyZodValidation.createAcademicFacultyZodValidationSchema
  ),
  AcademicFacultyController.createFaculty
);

router.get('/', AcademicFacultyController.getAllAcademicFaculties);
router.get('/:id', AcademicFacultyController.getFaculty);

router.patch(
  '/:id',
  validateRequest(
    AcademicFacultyZodValidation.updateAcademicfacultyZodValidationSchema
  ),
  AcademicFacultyController.updateFaculty
);
router.delete('/:id', AcademicFacultyController.deleteFaculty);

const AcademicFacultyRoutes = router;
export default AcademicFacultyRoutes;
