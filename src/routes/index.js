const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const projetosRoutes = require('./projetosRoutes');
const etapasRoutes = require('./etapasRoutes');
const diarioRoutes = require('./diarioObrasRoutes');
const aprovacoesRoutes = require('./aprovacoesRoutes');
const pagamentosRoutes = require('./pagamentosRoutes');
const agendaRoutes = require('./agendaRoutes');
const imprevistosRoutes = require('./imprevistosRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const portalRoutes = require('./portalRoutes');

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

router.use('/auth', authRoutes);
router.use('/projetos', projetosRoutes);
router.use('/etapas', etapasRoutes);
router.use('/diario-obras', diarioRoutes);
router.use('/aprovacoes', aprovacoesRoutes);
router.use('/pagamentos', pagamentosRoutes);
router.use('/agenda', agendaRoutes);
router.use('/imprevistos', imprevistosRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/portal', portalRoutes);

module.exports = router;