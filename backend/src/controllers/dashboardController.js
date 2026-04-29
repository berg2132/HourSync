const dashboardService = require('../services/dashboardService');

const dashboardController = {
  async dashboardAdmin(req, res, next) {
    try { res.json(await dashboardService.dashboardAdmin()); }
    catch (err) { next(err); }
  },

  async dashboardCoordenador(req, res, next) {
    try { res.json(await dashboardService.dashboardCoordenador(req.params.cursoId)); }
    catch (err) { next(err); }
  },
};

module.exports = dashboardController;
