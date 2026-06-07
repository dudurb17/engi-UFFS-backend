const express = require('express');
const router = express.Router();
const pagamentosController = require('../controllers/pagamentosController');
const autenticar = require('../middlewares/autenticar');
const autorizar = require('../middlewares/autorizar');

router.get('/', autenticar, pagamentosController.listar);
router.get('/:id', autenticar, pagamentosController.buscar);
router.post('/', autenticar, autorizar('ENGENHEIRO'), pagamentosController.criar);
router.put('/:id', autenticar, autorizar('ENGENHEIRO'), pagamentosController.atualizar);
router.delete('/:id', autenticar, autorizar('ENGENHEIRO'), pagamentosController.remover);

module.exports = router;