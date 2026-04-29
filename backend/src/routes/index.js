const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/usuarios', require('./usuarios'));
router.use('/cursos', require('./cursos'));
router.use('/categorias', require('./categorias'));
router.use('/certificados', require('./certificados'));
router.use('/dashboard', require('./dashboard'));
router.use('/progresso', require('./progresso'));
router.use('/upload', require('./upload'));

module.exports = router;
