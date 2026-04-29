const router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.put('/reset-senha', authController.resetSenha);

module.exports = router;
