import { Router } from 'express';
import userController from './user.controller';

const router: Router = Router();

// * Post request
router.post('/create_new_user', userController.createUser);

export default router;
