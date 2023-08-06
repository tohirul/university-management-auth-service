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
const admin_controller_1 = __importDefault(require('./admin.controller'));
const admin_validation_1 = __importDefault(require('./admin.validation'));
const router = express_1.default.Router();
router.get('/', admin_controller_1.default.getAllAdmin);
router.get('/:id', admin_controller_1.default.getAdminById);
router.delete('/:id', admin_controller_1.default.deleteAdmin);
router.patch(
  '/:id',
  (0, validateRequest_1.default)(
    admin_validation_1.default.updateAdminZodObject
  ),
  admin_controller_1.default.updateAdminById
);
const AdminRoutes = router;
exports.default = AdminRoutes;
