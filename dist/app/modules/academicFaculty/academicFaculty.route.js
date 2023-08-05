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
const academicFaculty_controller_1 = __importDefault(
  require('./academicFaculty.controller')
);
const academicFaculty_validation_1 = __importDefault(
  require('./academicFaculty.validation')
);
const router = express_1.default.Router();
router.post(
  '/create_faculty',
  (0, validateRequest_1.default)(
    academicFaculty_validation_1.default
      .createAcademicFacultyZodValidationSchema
  ),
  academicFaculty_controller_1.default.createFaculty
);
router.get('/', academicFaculty_controller_1.default.getAllAcademicFaculties);
router.get('/:id', academicFaculty_controller_1.default.getFaculty);
router.patch(
  '/:id',
  (0, validateRequest_1.default)(
    academicFaculty_validation_1.default
      .updateAcademicfacultyZodValidationSchema
  ),
  academicFaculty_controller_1.default.updateFaculty
);
router.delete('/:id', academicFaculty_controller_1.default.deleteFaculty);
const AcademicFacultyRoutes = router;
exports.default = AcademicFacultyRoutes;
