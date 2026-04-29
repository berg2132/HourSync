require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 8080;

console.log('Iniciando servidor HourSync...');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', PORT);
console.log('MONGODB_URI definida:', !!process.env.MONGODB_URI);
console.log('JWT_SECRET definido:', !!process.env.JWT_SECRET);

async function iniciarServidor() {
  try {
    console.log('Conectando ao MongoDB...');
    await connectDB();
    console.log('MongoDB conectado!');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error('ERRO AO INICIAR:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
}

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err.message);
  console.error(err.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('UNHANDLED REJECTION:', reason);
  process.exit(1);
});

iniciarServidor();
