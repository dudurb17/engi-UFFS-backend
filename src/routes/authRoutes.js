const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const autenticar = require('../middlewares/autenticar');
const autorizar = require('../middlewares/autorizar');

// Públicas
router.post('/register', authController.registrar);
router.post('/login', authController.login);

// Protegidas
router.get('/perfil', autenticar, authController.perfil);
router.get('/admin', autenticar, autorizar('ENGENHEIRO'), (req, res) => {
  res.json({ mensagem: 'Área do engenheiro (stub)' });
});

module.exports = router;