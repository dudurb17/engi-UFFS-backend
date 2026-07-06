const DashboardModel = require('../models/dashboardModel');
const { respostaItem } = require('../utils/resposta');

async function visaoGeral(req, res) {
  try {
    const dados = await DashboardModel.agregar();
    return respostaItem(res, dados);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao carregar dashboard' });
  }
}

module.exports = { visaoGeral };
