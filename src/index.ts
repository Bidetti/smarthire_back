import app from './app';
import mongoose from 'mongoose';
import logger from './config/logger';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT || 3000;

console.log("========================================================================\n");
console.log(`Iniciando servidor...`);

mongoose.connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("Configurando ambiente...");
    app.listen(port, () => {
      console.log(`Servidor iniciado na porta ${port}`);
      console.log("\n========================================================================");
    });
  })
  .catch((err) => {
    logger.error('Erro ao conectar ao banco de dados', err);
  });
