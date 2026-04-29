function errorHandler(err, req, res, next) {
  console.error('Erro:', err.message);

  const status = err.status || 500;
  const mensagem = err.message || 'Erro interno do servidor';

  res.status(status).json({ mensagem });
}

module.exports = errorHandler;
