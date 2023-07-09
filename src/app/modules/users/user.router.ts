import { Router } from 'express';
import UserController from './user.controller';

const router: Router = Router();

// * Post request
router.post('/create_new_user', UserController.createUser);

const UserRoutes = router;
export default UserRoutes;
