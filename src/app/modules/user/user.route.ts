import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import UserController from './user.controller';
import UserValidation from './user.validation';

const router = express.Router();

// * Post requests

router.post(
  '/create_new_student',
  validateRequest(UserValidation.createStudentZodSchema),
  UserController.createStudent
);

router.post(
  '/create_new_faculty',
  validateRequest(UserValidation.createFacultyZodSchema),
  UserController.createFaculty
);

router.post(
  '/create_new_admin',
  validateRequest(UserValidation.createAdminZodSchema),
  UserController.createAdmin
);

const UserRoutes = router;
export default UserRoutes;
