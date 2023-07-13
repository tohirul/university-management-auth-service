import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import AcademicFacultyController from './academicFaculty.controller';
import AcademicFacultyValidation from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create_faculty',
  validateRequest(AcademicFacultyValidation.createFacultyValidation),
  AcademicFacultyController.createFaculty
);

router.get('/', AcademicFacultyController.getAllAcademicFaculties);
router.get('/:id', AcademicFacultyController.getFaculty);

const AcademicFacultyRoutes = router;
export default AcademicFacultyRoutes;
