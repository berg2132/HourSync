const authService = require('../services/authService');

const authController = {
  async login(req, res, next) {
    try {
      const { email, senha } = req.body;
      const resultado = await authService.login(email, senha);
      res.json(resultado);
    } catch (err) { next(err); }
  },

  async resetSenha(req, res, next) {
    try {
      const { email, novaSenha } = req.query;
      const usuario = await authService.resetSenha(email, novaSenha);
      res.json(usuario);
    } catch (err) { next(err); }
  },
};

module.exports = authController;
