const ProjetoModel = require("../models/projetoModel");

const CAMPOS_PERMITIDOS = [
  "nome",
  "clienteId",
  "endereco",
  "dataInicioPrevista",
  "prazoDias",
  "orcamento",
  "status",
];

function filtroPorUsuario(usuario) {
  if (usuario.role === "CLIENTE") {
    return { clienteId: usuario.id };
  }
  return {};
}

function extrairDados(body) {
  return CAMPOS_PERMITIDOS.reduce((dados, campo) => {
    if (body[campo] !== undefined) {
      dados[campo] = body[campo];
    }
    return dados;
  }, {});
}

function obterId(req) {
  return req.query.id;
}

async function validarCliente(clienteId) {
  if (!clienteId) {
    return "Cliente é obrigatório";
  }

  const existe = await ProjetoModel.clienteExiste(clienteId);
  if (!existe) {
    return "Cliente não encontrado";
  }

  return null;
}

async function listar(req, res) {
  try {
    if (req.query.id) {
      return buscar(req, res);
    }

    const projetos = await ProjetoModel.listar(filtroPorUsuario(req.usuario));

    return res.status(200).json({
      total: projetos.length,
      projetos,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: "Erro ao listar projetos" });
  }
}

async function buscar(req, res) {
  try {
    const id = obterId(req);

    if (!id) {
      return res.status(400).json({ erro: "Id é obrigatório" });
    }

    const projeto = await ProjetoModel.buscarPorId(id);

    if (!projeto) {
      return res.status(404).json({ erro: "Projeto não encontrado" });
    }

    if (
      req.usuario.role === "CLIENTE" &&
      projeto.clienteId !== req.usuario.id
    ) {
      return res.status(403).json({ erro: "Permissão insuficiente" });
    }

    return res.status(200).json(projeto);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: "Erro ao buscar projeto" });
  }
}

async function criar(req, res) {
  try {
    const dados = extrairDados(req.body);

    if (!dados.nome) {
      return res.status(400).json({ erro: "Nome da obra é obrigatório" });
    }

    const erroCliente = await validarCliente(dados.clienteId);
    if (erroCliente) {
      return res.status(400).json({ erro: erroCliente });
    }

    const projeto = await ProjetoModel.criar(dados);
    const projetoCompleto = await ProjetoModel.buscarPorId(projeto.id);

    return res.status(201).json(projetoCompleto);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: "Erro ao criar projeto" });
  }
}

async function atualizar(req, res) {
  try {
    const id = obterId(req);

    if (!id) {
      return res.status(400).json({ erro: "Id é obrigatório" });
    }

    const projeto = await ProjetoModel.buscarPorId(id);

    if (!projeto) {
      return res.status(404).json({ erro: "Projeto não encontrado" });
    }

    const dados = extrairDados(req.body);

    if (Object.keys(dados).length === 0) {
      return res.status(400).json({ erro: "Nenhum dado para atualizar" });
    }

    if (dados.clienteId !== undefined) {
      const erroCliente = await validarCliente(dados.clienteId);
      if (erroCliente) {
        return res.status(400).json({ erro: erroCliente });
      }
    }

    const projetoAtualizado = await ProjetoModel.atualizar(id, dados);

    return res.status(200).json(projetoAtualizado);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: "Erro ao atualizar projeto" });
  }
}

async function remover(req, res) {
  try {
    const id = obterId(req);

    if (!id) {
      return res.status(400).json({ erro: "Id é obrigatório" });
    }

    const projeto = await ProjetoModel.buscarPorId(id);

    if (!projeto) {
      return res.status(404).json({ erro: "Projeto não encontrado" });
    }

    await ProjetoModel.remover(id);

    return res.status(200).json({ mensagem: "Projeto removido" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: "Erro ao remover projeto" });
  }
}

module.exports = { listar, criar, atualizar, remover };
