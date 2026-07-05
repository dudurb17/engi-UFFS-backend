const ProjetoModel = require('../models/projetoModel');
const { respostaLista, respostaItem, respostaMensagem } = require('../utils/resposta');

async function listar(req, res) {
  try {
    if (req.query.id) {
      return buscar(req, res);
    }

    const projetos = await ProjetoModel.listarPorUsuario(req.usuario, req.query);
    return respostaLista(res, projetos);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao listar projetos' });
  }
}

async function buscar(req, res) {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400).json({ erro: 'Id é obrigatório' });
    }

    const resultado = await ProjetoModel.buscarPorIdAutorizado(id, req.usuario);

    if (resultado.erro) {
      return res.status(resultado.status).json({ erro: resultado.erro });
    }

    return respostaItem(res, resultado.data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao buscar projeto' });
  }
}

async function criar(req, res) {
  try {
    const resultado = await ProjetoModel.criarRegistro(req.body, req.usuario);

    if (resultado.erro) {
      return res.status(resultado.status).json({ erro: resultado.erro });
    }

    return respostaItem(res, resultado.data, resultado.status);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao criar projeto' });
  }
}

async function atualizar(req, res) {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400).json({ erro: 'Id é obrigatório' });
    }

    const resultado = await ProjetoModel.atualizarRegistro(id, req.body, req.usuario);

    if (resultado.erro) {
      return res.status(resultado.status).json({ erro: resultado.erro });
    }

    return respostaItem(res, resultado.data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao atualizar projeto' });
  }
}

async function remover(req, res) {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400).json({ erro: 'Id é obrigatório' });
    }

    const resultado = await ProjetoModel.removerRegistro(id, req.usuario);

    if (resultado.erro) {
      return res.status(resultado.status).json({ erro: resultado.erro });
    }

    return respostaMensagem(res, resultado.data.mensagem);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao remover projeto' });
  }
}

module.exports = { listar, criar, atualizar, remover };
