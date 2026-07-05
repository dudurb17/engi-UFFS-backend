const fs = require('fs');
const DiarioModel = require('../models/diarioModel');
const { respostaLista, respostaItem, respostaMensagem } = require('../utils/resposta');

async function listar(req, res) {
  try {
    if (req.query.id) {
      return buscar(req, res);
    }

    const registros = await DiarioModel.listarPorUsuario(req.usuario, req.query);
    return respostaLista(res, registros);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao listar diário de obras' });
  }
}

async function buscar(req, res) {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400).json({ erro: 'Id é obrigatório' });
    }

    const resultado = await DiarioModel.buscarPorIdAutorizado(id, req.usuario);

    if (resultado.erro) {
      return res.status(resultado.status).json({ erro: resultado.erro });
    }

    return respostaItem(res, resultado.data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao buscar registro de diário' });
  }
}

async function criar(req, res) {
  try {
    const resultado = await DiarioModel.criarRegistro(req.body, req.usuario);

    if (resultado.erro) {
      return res.status(resultado.status).json({ erro: resultado.erro });
    }

    return respostaItem(res, resultado.data, resultado.status);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao criar registro de diário' });
  }
}

async function atualizar(req, res) {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400).json({ erro: 'Id é obrigatório' });
    }

    const resultado = await DiarioModel.atualizarRegistro(id, req.body, req.usuario);

    if (resultado.erro) {
      return res.status(resultado.status).json({ erro: resultado.erro });
    }

    return respostaItem(res, resultado.data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao atualizar registro de diário' });
  }
}

async function remover(req, res) {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400).json({ erro: 'Id é obrigatório' });
    }

    const resultado = await DiarioModel.removerRegistro(id, req.usuario);

    if (resultado.erro) {
      return res.status(resultado.status).json({ erro: resultado.erro });
    }

    return respostaMensagem(res, resultado.data.mensagem);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao remover registro de diário' });
  }
}

async function enviarFoto(req, res) {
  try {
    const id = req.query.id;

    if (!id) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ erro: 'Id é obrigatório' });
    }

    if (!req.file) {
      return res.status(400).json({ erro: 'Arquivo de foto é obrigatório' });
    }

    const resultado = await DiarioModel.atualizarFoto(id, req.file.filename, req.usuario);

    if (resultado.erro) {
      fs.unlinkSync(req.file.path);
      return res.status(resultado.status).json({ erro: resultado.erro });
    }

    return respostaItem(res, resultado.data);
  } catch (err) {
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    console.error(err);
    return res.status(500).json({ erro: 'Erro ao enviar foto' });
  }
}

module.exports = { listar, criar, atualizar, remover, enviarFoto };
