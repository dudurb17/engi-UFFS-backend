const express = require('express');
const router = express.Router();
const aprovacoesController = require('../controllers/aprovacoesController');
const autenticar = require('../middlewares/autenticar');
const autorizar = require('../middlewares/autorizar');

router.get('/', autenticar, aprovacoesController.listar);
router.post('/', autenticar, autorizar('ENGENHEIRO'), aprovacoesController.criar);
router.put('/', autenticar, autorizar('CLIENTE'), aprovacoesController.responder);
router.delete('/', autenticar, autorizar('ENGENHEIRO'), aprovacoesController.remover);

module.exports = router;
