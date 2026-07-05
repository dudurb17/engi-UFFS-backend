const PagamentoModel = require('../models/pagamentoModel');
const { respostaLista, respostaItem, respostaMensagem } = require('../utils/resposta');

async function listar(req, res) {
  try {
    if (req.query.id) {
      return buscar(req, res);
    }

    const pagamentos = await PagamentoModel.listarPorUsuario(req.usuario);
    return respostaLista(res, pagamentos);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao listar pagamentos' });
  }
}

async function buscar(req, res) {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400).json({ erro: 'Id é obrigatório' });
    }

    const resultado = await PagamentoModel.buscarPorIdAutorizado(id, req.usuario);

    if (resultado.erro) {
      return res.status(resultado.status).json({ erro: resultado.erro });
    }

    return respostaItem(res, resultado.data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao buscar pagamento' });
  }
}

async function criar(req, res) {
  try {
    const resultado = await PagamentoModel.criarRegistro(req.body);

    if (resultado.erro) {
      return res.status(resultado.status).json({ erro: resultado.erro });
    }

    return respostaItem(res, resultado.data, resultado.status);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao criar pagamento' });
  }
}

async function atualizar(req, res) {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400).json({ erro: 'Id é obrigatório' });
    }

    const resultado = await PagamentoModel.atualizarRegistro(id, req.body);

    if (resultado.erro) {
      return res.status(resultado.status).json({ erro: resultado.erro });
    }

    return respostaItem(res, resultado.data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao atualizar pagamento' });
  }
}

async function remover(req, res) {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400).json({ erro: 'Id é obrigatório' });
    }

    const resultado = await PagamentoModel.removerRegistro(id);

    if (resultado.erro) {
      return res.status(resultado.status).json({ erro: resultado.erro });
    }

    return respostaMensagem(res, resultado.data.mensagem);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao remover pagamento' });
  }
}

module.exports = { listar, criar, atualizar, remover };
