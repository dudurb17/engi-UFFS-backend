const express = require('express');
const router = express.Router();
const diarioController = require('../controllers/diarioController');
const autenticar = require('../middlewares/autenticar');
const autorizar = require('../middlewares/autorizar');

router.get('/', autenticar, diarioController.listar);
router.get('/:id', autenticar, diarioController.buscar);
router.post('/', autenticar, diarioController.criar);
router.put('/:id', autenticar, autorizar('ENGENHEIRO'), diarioController.atualizar);
router.delete('/:id', autenticar, autorizar('ENGENHEIRO'), diarioController.remover);

module.exports = router;