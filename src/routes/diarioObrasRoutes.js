const express = require('express');
const router = express.Router();
const diarioController = require('../controllers/diarioController');
const autenticar = require('../middlewares/autenticar');
const autorizar = require('../middlewares/autorizar');
const uploadFotoDiario = require('../middlewares/uploadFotoDiario');

router.post(
  '/foto',
  autenticar,
  autorizar('ENGENHEIRO'),
  uploadFotoDiario,
  diarioController.enviarFoto
);

router.get('/', autenticar, diarioController.listar);
router.post('/', autenticar, diarioController.criar);
router.put('/', autenticar, autorizar('ENGENHEIRO'), diarioController.atualizar);
router.delete('/', autenticar, autorizar('ENGENHEIRO'), diarioController.remover);

module.exports = router;
