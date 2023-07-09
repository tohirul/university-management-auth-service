import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import UserRoutes from './app/modules/users/user.router';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ? Global Error Handler
app.use(globalErrorHandler);

// * Application Routes
app.use('/api/v1/users', UserRoutes);

// ? Test Runner
app.get('/', async (req: Request, res: Response) => {
  // Promise.reject(new Error('Unhandled promise Rejection'))
  // console.log(x)
  res.send('Hi, Server is running');
});

export default app;
