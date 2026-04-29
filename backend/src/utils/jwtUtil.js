const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_padrao_troque_em_producao';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

const jwtUtil = {
  gerarToken(email, role) {
    return jwt.sign({ sub: email, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  },

  extrairEmail(token) {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload.sub;
  },

  extrairRole(token) {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload.role;
  },

  validarToken(token) {
    try {
      jwt.verify(token, JWT_SECRET);
      return true;
    } catch {
      return false;
    }
  },
};

module.exports = jwtUtil;
