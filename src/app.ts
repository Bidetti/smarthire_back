import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import router from './routes/routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api', router);

export default app;