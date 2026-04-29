const progressoService = require('../services/progressoService');

const progressoController = {
  async progressoPorCurso(req, res, next) {
    try { res.json(await progressoService.progressoPorCurso(req.params.cursoId)); }
    catch (err) { next(err); }
  },

  async progressoPorAluno(req, res, next) {
    try { res.json(await progressoService.progressoPorAluno(req.params.alunoId)); }
    catch (err) { next(err); }
  },

  async calcularHoras(req, res, next) {
    try { res.json(await progressoService.calcularHoras(req.params.certificadoId)); }
    catch (err) { next(err); }
  },
};

module.exports = progressoController;
