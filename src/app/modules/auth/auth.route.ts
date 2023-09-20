import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import AuthContoller from './auth.controller';
import AuthValidation from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthContoller.authLogin
);

const AuthRoutes = router;
export default AuthRoutes;
