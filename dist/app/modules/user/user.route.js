'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const user_controller_1 = __importDefault(require('./user.controller'));
const user_validation_1 = __importDefault(require('./user.validation'));
const router = express_1.default.Router();
// * Post requests
router.post(
  '/create_new_student',
  (0, validateRequest_1.default)(
    user_validation_1.default.createStudentZodSchema
  ),
  user_controller_1.default.createStudent
);
router.post(
  '/create_new_faculty',
  (0, validateRequest_1.default)(
    user_validation_1.default.createFacultyZodSchema
  ),
  user_controller_1.default.createFaculty
);
router.post(
  '/create_new_admin',
  (0, validateRequest_1.default)(
    user_validation_1.default.createAdminZodSchema
  ),
  user_controller_1.default.createAdmin
);
const UserRoutes = router;
exports.default = UserRoutes;
