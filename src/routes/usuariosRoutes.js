const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const autenticar = require('../middlewares/autenticar');
const autorizar = require('../middlewares/autorizar');

router.get('/', autenticar, autorizar('ENGENHEIRO'), usuariosController.listar);

module.exports = router;
