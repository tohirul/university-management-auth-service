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

const ManagementDepartmentRoutes = router;
export default ManagementDepartmentRoutes;
