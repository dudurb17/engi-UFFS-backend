const UserModel = require('../models/userModel');
const { respostaLista } = require('../utils/resposta');

async function listar(req, res) {
  try {
    const resultado = await UserModel.listarComFiltro(req.query);

    if (resultado.erro) {
      return res.status(resultado.status).json({ erro: resultado.erro });
    }

    return respostaLista(res, resultado.data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao listar usuários' });
  }
}

module.exports = { listar };
