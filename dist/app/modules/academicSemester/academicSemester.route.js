"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicSemester_controller_1 = __importDefault(require("./academicSemester.controller"));
const academicSemester_validation_1 = __importDefault(require("./academicSemester.validation"));
const router = express_1.default.Router();
router.post('/create_semester', (0, validateRequest_1.default)(academicSemester_validation_1.default.createAcademicSemesterZodValidationSchema), academicSemester_controller_1.default.createSemester);
router.patch('/:id', (0, validateRequest_1.default)(academicSemester_validation_1.default.updateAcademicSemesterZodValidationSchema), academicSemester_controller_1.default.updateSemester);
router.get('/', academicSemester_controller_1.default.getAllSemesters);
router.get('/:id', academicSemester_controller_1.default.getSingleSemester);
router.delete('/:id', academicSemester_controller_1.default.deleteSemester);
const AcademicSemesterRoutes = router;
exports.default = AcademicSemesterRoutes;
