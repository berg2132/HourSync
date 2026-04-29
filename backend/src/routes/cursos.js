const router = require('express').Router();
const cursoController = require('../controllers/cursoController');
const { autenticar, autorizar } = require('../middlewares/auth');

router.get('/', cursoController.listar);
router.get('/:id', cursoController.buscarPorId);
router.post('/', autenticar, autorizar('SUPER_ADMIN'), cursoController.criar);
router.delete('/:id', autenticar, autorizar('SUPER_ADMIN'), cursoController.deletar);

module.exports = router;
