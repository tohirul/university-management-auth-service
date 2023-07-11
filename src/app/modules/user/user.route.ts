import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import UserController from './user.controller';
import UserValidation from './user.validation';

const router = express.Router();

// * Post request
// router.post('/create_new_user', validateRequest(UserValidation.createUserZodSchema), UserController.createUser);
router.post(
  '/create_new_user',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

const UserRoutes = router;
export default UserRoutes;
