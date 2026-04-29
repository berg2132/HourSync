const router = require('express').Router();
const progressoController = require('../controllers/progressoController');
const { autenticar } = require('../middlewares/auth');

router.get('/curso/:cursoId', autenticar, progressoController.progressoPorCurso);
router.get('/aluno/:alunoId', autenticar, progressoController.progressoPorAluno);
router.get('/calculo/:certificadoId', autenticar, progressoController.calcularHoras);

module.exports = router;
