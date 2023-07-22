import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import UserController from './user.controller';
import UserValidation from './user.validation';

const router = express.Router();

// * Post request
router.post(
  '/create_new_student',
  validateRequest(UserValidation.createStudentZodSchema),
  UserController.createStudent
);

const UserRoutes = router;
export default UserRoutes;
