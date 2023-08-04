import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import AdminController from './admin.controller';
import AdminZodValidation from './admin.validation';

const router = express.Router();

router.get('/', AdminController.getAllAdmin);
router.get('/:id', AdminController.getAdminById);

router.delete('/:id', AdminController.deleteAdmin);

router.patch(
  '/:id',
  validateRequest(AdminZodValidation.updateAdminZodObject),
  AdminController.updateAdminById
);

const AdminRoutes = router;
export default AdminRoutes;
