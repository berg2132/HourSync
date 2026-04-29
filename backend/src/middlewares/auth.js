const jwtUtil = require('../utils/jwtUtil');

const autenticar = (req, res, next) => {
  const header = req.headers['authorization'];

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  const token = header.substring(7);

  if (!jwtUtil.validarToken(token)) {
    return res.status(401).json({ mensagem: 'Token inválido ou expirado' });
  }

  req.usuarioEmail = jwtUtil.extrairEmail(token);
  req.usuarioRole = jwtUtil.extrairRole(token);

  next();
};

const autorizar = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.usuarioRole)) {
      return res.status(403).json({ mensagem: 'Acesso negado: permissão insuficiente' });
    }
    next();
  };
};

module.exports = { autenticar, autorizar };
