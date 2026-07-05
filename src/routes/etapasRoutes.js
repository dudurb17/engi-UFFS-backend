const express = require('express');
const router = express.Router();
const etapasController = require('../controllers/etapasController');
const autenticar = require('../middlewares/autenticar');
const autorizar = require('../middlewares/autorizar');

router.get('/', autenticar, etapasController.listar);
router.post('/', autenticar, autorizar('ENGENHEIRO'), etapasController.criar);
router.put('/', autenticar, autorizar('ENGENHEIRO'), etapasController.atualizar);
router.delete('/', autenticar, autorizar('ENGENHEIRO'), etapasController.remover);

module.exports = router;
