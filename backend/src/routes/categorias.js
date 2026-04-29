const router = require('express').Router();
const categoriaController = require('../controllers/categoriaController');
const { autenticar } = require('../middlewares/auth');

router.get('/', categoriaController.listar);
router.get('/curso/:cursoId', categoriaController.listarPorCurso);
router.post('/', autenticar, categoriaController.criar);
router.delete('/:id', autenticar, categoriaController.deletar);

module.exports = router;
