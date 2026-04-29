const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');

const app = express();

// Pasta de uploads
const uploadDir = path.resolve(process.env.UPLOAD_DIR || 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// CORS — permite qualquer origem (necessário para GitHub Pages -> Render)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(uploadDir));

// Health check — o Render usa isso para saber se o serviço está vivo
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'HourSync Backend rodando!' });
});

app.use('/', routes);
app.use(errorHandler);

module.exports = app;
