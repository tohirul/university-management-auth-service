import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import authHandler from '../../middlewares/authHandler';
import validateRequest from '../../middlewares/validateRequest';
import AcademicFacultyController from './academicFaculty.controller';
import AcademicFacultyZodValidation from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create_faculty',
  validateRequest(
    AcademicFacultyZodValidation.createAcademicFacultyZodValidationSchema
  ),
  authHandler(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACILITY
  ),
  AcademicFacultyController.createFaculty
);

router.get(
  '/',
  authHandler(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACILITY
  ),
  AcademicFacultyController.getAllAcademicFaculties
);
router.get(
  '/:id',
  authHandler(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACILITY,
    ENUM_USER_ROLE.STUDENT
  ),
  AcademicFacultyController.getFaculty
);

router.patch(
  '/:id',
  validateRequest(
    AcademicFacultyZodValidation.updateAcademicfacultyZodValidationSchema
  ),
  authHandler(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACILITY
  ),
  AcademicFacultyController.updateFaculty
);
router.delete(
  '/:id',
  authHandler(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACILITY
  ),
  AcademicFacultyController.deleteFaculty
);

const AcademicFacultyRoutes = router;
export default AcademicFacultyRoutes;
