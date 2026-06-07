const express = require('express');
const router = express.Router();
const portalController = require('../controllers/portalController');
const autenticar = require('../middlewares/autenticar');
const autorizar = require('../middlewares/autorizar');

router.get('/', autenticar, autorizar('CLIENTE'), portalController.visaoCliente);

module.exports = router;
