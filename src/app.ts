import express, {Application,Request,Response,NextFunction} from 'express';
import cors from "cors"

const app:Application = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.get("/",(req:Request, res:Response,next:NextFunction) => {
    res.send("Hi, Server is running")
})

export default app;