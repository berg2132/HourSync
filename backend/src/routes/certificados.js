const router = require('express').Router();
const certificadoController = require('../controllers/certificadoController');
const { autenticar } = require('../middlewares/auth');

router.get('/', autenticar, certificadoController.listar);
router.get('/aluno/:alunoId', autenticar, certificadoController.listarPorAluno);
router.get('/curso/:cursoId', autenticar, certificadoController.listarPorCurso);
router.get('/status/:status', autenticar, certificadoController.listarPorStatus);
router.get('/:id', autenticar, certificadoController.buscarPorId);
router.post('/', autenticar, certificadoController.criar);
router.patch('/:id/validar', autenticar, certificadoController.validar);

module.exports = router;
