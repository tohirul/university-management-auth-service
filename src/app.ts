import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import Routes from './app/routes/routes';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ? Test Run
app.get('/', async (req: Request, res: Response) => {
  const apiInfo = {
    name: 'University Management API',
    version: '1.0.0',
    description: 'API for managing university-related data.',
    documentation: 'Link to API documentation goes here',
    endpoints: {
      users: '/api/v1/user',
      academiSemesters: 'api/v1/academic_semester',
      academicFaculty: '/api/v1/academic_faculty',
      academicDepartment: '/api/v1/academic_department',
      managementDepartment: '/api/v1/management_department',
      student: '/api/v1/student',
      faculty: '/api/v1/faculty',
      admin: '/api/v1/admin',
    },
  };
  res.status(200).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Server is live and ready to use',
    ...apiInfo,
  });
});

// * Application Routes
app.use('/api/v1/', Routes);

// ? Global Error Handler
app.use(globalErrorHandler);

// ? Invalid URL Handler
app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Invalid URL, please try again!',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Please check your URL and try again!',
      },
    ],
  });
});

export default app;
