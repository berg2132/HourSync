const categoriaService = require('../services/categoriaService');

const categoriaController = {
  async listar(req, res, next) {
    try { res.json(await categoriaService.listar()); }
    catch (err) { next(err); }
  },

  async listarPorCurso(req, res, next) {
    try { res.json(await categoriaService.listarPorCurso(req.params.cursoId)); }
    catch (err) { next(err); }
  },

  async criar(req, res, next) {
    try { res.json(await categoriaService.criar(req.body)); }
    catch (err) { next(err); }
  },

  async deletar(req, res, next) {
    try {
      await categoriaService.deletar(req.params.id);
      res.status(204).send();
    } catch (err) { next(err); }
  },
};

module.exports = categoriaController;
