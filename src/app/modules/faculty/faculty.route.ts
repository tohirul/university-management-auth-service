import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import FacultyController from './faculty.controller';
import FacultyZodValidation from './faculty.validation';

const router = express.Router();

router.get('/:id', FacultyController.getFaculty);
router.get('/', FacultyController.getAllFaculty);

router.patch(
  '/:id',
  validateRequest(FacultyZodValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
);

router.delete('/:id', FacultyController.deleteFaculty);

const FacultyRoutes = router;

export default FacultyRoutes;
