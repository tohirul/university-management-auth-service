"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicDepartment_controller_1 = __importDefault(require("./academicDepartment.controller"));
const academicDepartment_validation_1 = __importDefault(require("./academicDepartment.validation"));
const router = express_1.default.Router();
router.post('/create_department', (0, validateRequest_1.default)(academicDepartment_validation_1.default.createDepartmaentZodValidationSchema), academicDepartment_controller_1.default.createAcademicDepartment);
router.patch('/:id', (0, validateRequest_1.default)(academicDepartment_validation_1.default.updateAcademicDepartmentZodSchema), academicDepartment_controller_1.default.updateAcademicDepartment);
router.get('/', academicDepartment_controller_1.default.getAllAcademicDepartments);
router.get('/:id', academicDepartment_controller_1.default.getSingleAcademicDepartment);
router.delete('/:id', academicDepartment_controller_1.default.deleteAcademicDepartment);
const AcademicDepartmentRoutes = router;
exports.default = AcademicDepartmentRoutes;
