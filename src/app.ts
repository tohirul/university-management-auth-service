import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import Routes from './app/routes/routes';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
// ? Test Run
app.get('/', async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hi, Server is running' });
});

// const academicSemester = {
//   year: '2023',
//   code: '02',
// };
// const generateNewId = async () => {
//   const stuId = await generateStudentId(academicSemester);
//   const facId = await generateFacultyId();
//   const admId = await generateAdminId();
//   console.log(stuId, facId, admId);
// };
// generateNewId();

export default app;
