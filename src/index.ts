import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './routes/routes';

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
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("Configurando ambiente...");
    app.listen(process.env.PORT, () => {
      console.log(`Servidor iniciado na porta ${process.env.PORT}`);
      console.log("\n========================================================================");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
