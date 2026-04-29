const certificadoService = require('../services/certificadoService');

const certificadoController = {
  async listar(req, res, next) {
    try { res.json(await certificadoService.listar()); }
    catch (err) { next(err); }
  },

  async buscarPorId(req, res, next) {
    try { res.json(await certificadoService.buscarPorId(req.params.id)); }
    catch (err) { next(err); }
  },

  async listarPorAluno(req, res, next) {
    try { res.json(await certificadoService.listarPorAluno(req.params.alunoId)); }
    catch (err) { next(err); }
  },

  async listarPorCurso(req, res, next) {
    try { res.json(await certificadoService.listarPorCurso(req.params.cursoId)); }
    catch (err) { next(err); }
  },

  async listarPorStatus(req, res, next) {
    try { res.json(await certificadoService.listarPorStatus(req.params.status)); }
    catch (err) { next(err); }
  },

  async criar(req, res, next) {
    try { res.json(await certificadoService.criar(req.body)); }
    catch (err) { next(err); }
  },

  async validar(req, res, next) {
    try { res.json(await certificadoService.validar(req.params.id, req.query)); }
    catch (err) { next(err); }
  },
};

module.exports = certificadoController;
