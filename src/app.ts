import express, { Application, Request, Response } from 'express';
import cors from 'cors';
// import { dbConnect } from './dbConnect';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hi, Server is running');
});

export default app;