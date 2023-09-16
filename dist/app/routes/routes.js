"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const academicDepartment_route_1 = __importDefault(require("../modules/academicDepartment/academicDepartment.route"));
const academicFaculty_route_1 = __importDefault(require("../modules/academicFaculty/academicFaculty.route"));
const academicSemester_route_1 = __importDefault(require("../modules/academicSemester/academicSemester.route"));
const admin_route_1 = __importDefault(require("../modules/admin/admin.route"));
const faculty_route_1 = __importDefault(require("../modules/faculty/faculty.route"));
const managementDepartment_route_1 = __importDefault(require("../modules/managementDepartment/managementDepartment.route"));
const student_route_1 = __importDefault(require("../modules/student/student.route"));
const user_route_1 = __importDefault(require("../modules/user/user.route"));
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/user',
        route: user_route_1.default,
    },
    {
        path: '/academic_semester',
        route: academicSemester_route_1.default,
    },
    {
        path: '/academic_faculty',
        route: academicFaculty_route_1.default,
    },
    {
        path: '/academic_department',
        route: academicDepartment_route_1.default,
    },
    {
        path: '/managementDepartment',
        route: managementDepartment_route_1.default,
    },
    {
        path: '/student',
        route: student_route_1.default,
    },
    {
        path: '/faculty',
        route: faculty_route_1.default,
    },
    {
        path: '/admin',
        route: admin_route_1.default,
    },
];
for (const { path, route } of moduleRoutes) {
    router.use(path, route);
}
const Routes = router;
exports.default = Routes;
