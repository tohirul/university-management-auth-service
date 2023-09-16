"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const faculty_controller_1 = __importDefault(require("./faculty.controller"));
const faculty_validation_1 = __importDefault(require("./faculty.validation"));
const router = express_1.default.Router();
router.get('/:id', faculty_controller_1.default.getFaculty);
router.get('/', faculty_controller_1.default.getAllFaculty);
router.patch('/:id', (0, validateRequest_1.default)(faculty_validation_1.default.updateFacultyZodSchema), faculty_controller_1.default.updateFaculty);
router.delete('/:id', faculty_controller_1.default.deleteFaculty);
const FacultyRoutes = router;
exports.default = FacultyRoutes;
