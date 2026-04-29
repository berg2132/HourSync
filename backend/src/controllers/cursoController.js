const cursoService = require('../services/cursoService');

const cursoController = {
  async listar(req, res, next) {
    try { res.json(await cursoService.listar()); }
    catch (err) { next(err); }
  },

  async buscarPorId(req, res, next) {
    try { res.json(await cursoService.buscarPorId(req.params.id)); }
    catch (err) { next(err); }
  },

  async criar(req, res, next) {
    try { res.json(await cursoService.criar(req.body)); }
    catch (err) { next(err); }
  },

  async deletar(req, res, next) {
    try {
      await cursoService.deletar(req.params.id);
      res.status(204).send();
    } catch (err) { next(err); }
  },
};

module.exports = cursoController;
