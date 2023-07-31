import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import StudentController from './student.controller';
import StudentZodValidation from './student.validation';

const route = express.Router();

route.get('/:id', StudentController.getStudent);
route.get('/', StudentController.getAllStudents);

route.delete('/:id', StudentController.deleteStudent);

route.patch(
  '/:id',
  validateRequest(StudentZodValidation.updateStudentZodSchema),
  StudentController.updateStudent
);

const StudentRoutes = route;
export default StudentRoutes;
