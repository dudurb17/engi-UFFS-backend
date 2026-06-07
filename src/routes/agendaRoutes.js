const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agendaController');
const autenticar = require('../middlewares/autenticar');
const autorizar = require('../middlewares/autorizar');

router.get('/', autenticar, agendaController.listar);
router.post('/solicitar', autenticar, autorizar('CLIENTE'), agendaController.solicitar);
router.get('/:id', autenticar, agendaController.buscar);
router.post('/', autenticar, autorizar('ENGENHEIRO'), agendaController.criar);
router.put('/:id', autenticar, autorizar('ENGENHEIRO'), agendaController.atualizar);
router.delete('/:id', autenticar, autorizar('ENGENHEIRO'), agendaController.remover);

module.exports = router;