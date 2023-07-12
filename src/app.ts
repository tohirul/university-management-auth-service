import cors from 'cors';
import express, { Application, Request, Response } from 'express';
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

// ? Test Runner
app.get('/', async (req: Request, res: Response) => {
  res.send('Hi, Server is running');
});

export default app;
