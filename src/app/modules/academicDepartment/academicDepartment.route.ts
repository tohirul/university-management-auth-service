import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import AcademicDepartmentController from './academicDepartment.controller';
import AcademicDepartmentZodvalidation from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create_department',
  validateRequest(
    AcademicDepartmentZodvalidation.createDepartmaentZodValidationSchema
  ),
  AcademicDepartmentController.createAcademicDepartment
);

router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentZodvalidation.updateAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.updateAcademicDepartment
);

router.get('/', AcademicDepartmentController.getAllAcademicDepartments);
router.get('/:id', AcademicDepartmentController.getSingleAcademicDepartment);

router.delete('/:id', AcademicDepartmentController.deleteAcademicDepartment);

const AcademicDepartmentRoutes = router;
export default AcademicDepartmentRoutes;
