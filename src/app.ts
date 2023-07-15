import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './app/modules/user/user.utility';
import Routes from './app/routes/routes';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * Application Routes
app.use('/api/v1/', Routes);

// ? Global Error Handler
app.use(globalErrorHandler);
// ? Invalida URL Handler
app.use((req: Request, res: Response, next: NextFunction) => {
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
  next();
});
// ? Test Run
app.get('/', async (req: Request, res: Response) => {
  res.send('Hi, Server is running');
});

const academicSemester = {
  year: '2023',
  code: '02',
};
const generateNewId = async () => {
  const stuId = await generateStudentId(academicSemester);
  const facId = await generateFacultyId();
  const admId = await generateAdminId();
  console.log(stuId, facId, admId);
};
generateNewId();

export default app;
