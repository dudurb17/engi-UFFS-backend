const express = require('express');
const router = express.Router();
const projetosController = require('../controllers/projetosController');
const autenticar = require('../middlewares/autenticar');
const autorizar = require('../middlewares/autorizar');

router.get('/', autenticar, projetosController.listar);
router.post('/', autenticar, autorizar('ENGENHEIRO'), projetosController.criar);
router.put('/', autenticar, autorizar('ENGENHEIRO'), projetosController.atualizar);
router.delete('/', autenticar, autorizar('ENGENHEIRO'), projetosController.remover);

module.exports = router;
