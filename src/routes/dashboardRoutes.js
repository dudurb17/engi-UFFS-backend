const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const autenticar = require('../middlewares/autenticar');
const autorizar = require('../middlewares/autorizar');

router.get('/', autenticar, autorizar('ENGENHEIRO'), dashboardController.visaoGeral);

module.exports = router;
