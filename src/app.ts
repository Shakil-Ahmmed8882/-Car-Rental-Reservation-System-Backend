
import express, { Application} from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cors from 'cors';





const app: Application = express();

//parsers
app.use(express.json());
app.use(cors({origin: ["http://localhost:5173"], credentials:true}))


// application routes
app.use('/api', router);

// Error 
app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
