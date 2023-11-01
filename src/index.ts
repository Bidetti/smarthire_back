import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './routes/routes';
import logger from './config/logger';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api', router);

console.log("========================================================================\n");
console.log(`Iniciando servidor...`);
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("Configurando ambiente...");
    app.listen(port, () => {
      console.log(`Servidor iniciado na porta ${port}`);
      console.log("\n========================================================================");
      logger.info(`Servidor iniciado na porta ${port}`);
    });
  })
  .catch((err) => {
    logger.error('Erro ao conectar ao banco de dados', err);
  });
