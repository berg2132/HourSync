const usuarioService = require('../services/usuarioService');

const usuarioController = {
  async listar(req, res, next) {
    try { res.json(await usuarioService.listar()); }
    catch (err) { next(err); }
  },

  async listarCoordenadores(req, res, next) {
    try { res.json(await usuarioService.listarCoordenadores()); }
    catch (err) { next(err); }
  },

  async listarAlunos(req, res, next) {
    try { res.json(await usuarioService.listarAlunos()); }
    catch (err) { next(err); }
  },

  async buscarPorId(req, res, next) {
    try { res.json(await usuarioService.buscarPorId(req.params.id)); }
    catch (err) { next(err); }
  },

  async criar(req, res, next) {
    try { res.json(await usuarioService.criar(req.body)); }
    catch (err) { next(err); }
  },

  async alterarStatus(req, res, next) {
    try {
      const ativo = req.query.ativo === 'true';
      res.json(await usuarioService.alterarStatus(req.params.id, ativo));
    } catch (err) { next(err); }
  },

  async deletar(req, res, next) {
    try {
      await usuarioService.deletar(req.params.id);
      res.status(204).send();
    } catch (err) { next(err); }
  },
};

module.exports = usuarioController;
