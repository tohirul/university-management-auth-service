import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import ManagementDepartmentController from './managementDepartment.controller';
import ManagementDepartmentValidation from './managementDepartment.validation';

const router = express.Router();

router.post(
  '/create_management',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.createManagementDepartment
);

router.get('/', ManagementDepartmentController.getAllManagementDepartments);
router.get('/:id', ManagementDepartmentController.getManagementDepartmentById);

router.delete(
  '/:id',
  ManagementDepartmentController.deleteManagementDepartment
);

router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.updateManagementDepartment
);

const ManagementDepartmentRoutes = router;
export default ManagementDepartmentRoutes;
