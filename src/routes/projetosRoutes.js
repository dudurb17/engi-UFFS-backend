const express = require('express');
const router = express.Router();
const projetosController = require('../controllers/projetosController');
const autenticar = require('../middlewares/autenticar');
const autorizar = require('../middlewares/autorizar');

router.get('/', autenticar, projetosController.listar);
router.get('/:id', autenticar, projetosController.buscar);
router.post('/', autenticar, autorizar('ENGENHEIRO'), projetosController.criar);
router.put('/:id', autenticar, autorizar('ENGENHEIRO'), projetosController.atualizar);
router.delete('/:id', autenticar, autorizar('ENGENHEIRO'), projetosController.remover);

module.exports = router;