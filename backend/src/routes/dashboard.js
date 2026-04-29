const router = require('express').Router();
const dashboardController = require('../controllers/dashboardController');
const { autenticar } = require('../middlewares/auth');

router.get('/admin', autenticar, dashboardController.dashboardAdmin);
router.get('/coordenador/:cursoId', autenticar, dashboardController.dashboardCoordenador);

module.exports = router;
