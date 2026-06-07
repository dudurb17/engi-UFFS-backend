const express = require('express');
const router = express.Router();
const etapasController = require('../controllers/etapasController');
const autenticar = require('../middlewares/autenticar');
const autorizar = require('../middlewares/autorizar');

router.get('/', autenticar, etapasController.listar);
router.get('/:id', autenticar, etapasController.buscar);
router.post('/', autenticar, autorizar('ENGENHEIRO'), etapasController.criar);
router.put('/:id', autenticar, autorizar('ENGENHEIRO'), etapasController.atualizar);
router.delete('/:id', autenticar, autorizar('ENGENHEIRO'), etapasController.remover);

module.exports = router;