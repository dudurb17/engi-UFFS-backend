const express = require('express');
const router = express.Router();
const imprevistosController = require('../controllers/imprevistoController');
const autenticar = require('../middlewares/autenticar');
const autorizar = require('../middlewares/autorizar');

router.get('/', autenticar, imprevistosController.listar);
router.post('/', autenticar, imprevistosController.criar);
router.put('/', autenticar, autorizar('ENGENHEIRO'), imprevistosController.atualizar);
router.delete('/', autenticar, autorizar('ENGENHEIRO'), imprevistosController.remover);

module.exports = router;
