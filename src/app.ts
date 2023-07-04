import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/modules/users/user.router';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * Application Routes
app.use('/api/v1/users', router);

// ? Test Runner
app.get('/', async (req: Request, res: Response) => {
  res.send('Hi, Server is running');
});

export default app;
