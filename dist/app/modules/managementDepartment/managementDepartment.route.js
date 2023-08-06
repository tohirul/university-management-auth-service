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
const managementDepartment_controller_1 = __importDefault(
  require('./managementDepartment.controller')
);
const managementDepartment_validation_1 = __importDefault(
  require('./managementDepartment.validation')
);
const router = express_1.default.Router();
router.post(
  '/create_management',
  (0, validateRequest_1.default)(
    managementDepartment_validation_1.default
      .createManagementDepartmentZodSchema
  ),
  managementDepartment_controller_1.default.createManagementDepartment
);
router.get(
  '/',
  managementDepartment_controller_1.default.getAllManagementDepartments
);
router.get(
  '/:id',
  managementDepartment_controller_1.default.getManagementDepartmentById
);
router.delete(
  '/:id',
  managementDepartment_controller_1.default.deleteManagementDepartment
);
router.patch(
  '/:id',
  (0, validateRequest_1.default)(
    managementDepartment_validation_1.default
      .updateManagementDepartmentZodSchema
  ),
  managementDepartment_controller_1.default.updateManagementDepartment
);
const ManagementDepartmentRoutes = router;
exports.default = ManagementDepartmentRoutes;
