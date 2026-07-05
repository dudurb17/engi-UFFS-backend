const db = require('../../models');
const { usuarioPodeAcessarProjeto } = require('../utils/acesso');

const CAMPOS_PERMITIDOS = [
  'nome',
  'clienteId',
  'engenheiroId',
  'endereco',
  'dataInicioPrevista',
  'prazoDias',
  'orcamento',
  'status'
];

const STATUS_VALIDOS = [
  'Em execução',
  'Planejamento',
  'Finalizado',
  'Suspenso'
];

const includeCliente = {
  model: db.User,
  as: 'cliente',
  attributes: ['id', 'nome', 'email']
};

const includeEngenheiro = {
  model: db.User,
  as: 'engenheiro',
  attributes: ['id', 'nome', 'email']
};

function extrairDados(body) {
  return CAMPOS_PERMITIDOS.reduce((dados, campo) => {
    if (body[campo] !== undefined) {
      dados[campo] = body[campo];
    }
    return dados;
  }, {});
}

function filtroPorUsuario(usuario, query = {}) {
  const filtros = {};

  if (usuario.role === 'CLIENTE') {
    filtros.clienteId = usuario.id;
  }

  if (usuario.role === 'ENGENHEIRO') {
    filtros.engenheiroId = usuario.id;
  } else if (query.engenheiroId) {
    filtros.engenheiroId = query.engenheiroId;
  }

  return filtros;
}

async function validarCliente(clienteId) {
  if (!clienteId) {
    return 'Cliente é obrigatório';
  }

  const existe = await clienteExiste(clienteId);
  if (!existe) {
    return 'Cliente não encontrado';
  }

  return null;
}

async function validarEngenheiro(engenheiroId) {
  if (!engenheiroId) {
    return 'Engenheiro é obrigatório';
  }

  const existe = await engenheiroExiste(engenheiroId);
  if (!existe) {
    return 'Engenheiro não encontrado';
  }

  return null;
}

function validarStatus(status) {
  if (status && !STATUS_VALIDOS.includes(status)) {
    return 'Status inválido. Use Em execução, Planejamento, Finalizado ou Suspenso';
  }
  return null;
}

async function listar(filtros = {}) {
  return db.Projeto.findAll({
    where: filtros,
    include: [includeCliente, includeEngenheiro],
    order: [['createdAt', 'DESC']]
  });
}

async function buscarPorId(id) {
  return db.Projeto.findByPk(id, {
    include: [includeCliente, includeEngenheiro]
  });
}

async function clienteExiste(clienteId) {
  const cliente = await db.User.findOne({
    where: { id: clienteId, role: 'CLIENTE' }
  });
  return !!cliente;
}

async function engenheiroExiste(engenheiroId) {
  const engenheiro = await db.User.findOne({
    where: { id: engenheiroId, role: 'ENGENHEIRO' }
  });
  return !!engenheiro;
}

async function criar(dados) {
  return db.Projeto.create(dados);
}

async function atualizar(id, dados) {
  const projeto = await db.Projeto.findByPk(id);

  if (!projeto) {
    return null;
  }

  await projeto.update(dados);
  return buscarPorId(id);
}

async function remover(id) {
  const projeto = await db.Projeto.findByPk(id);

  if (!projeto) {
    return false;
  }

  await projeto.destroy();
  return true;
}

async function listarPorUsuario(usuario, query = {}) {
  return listar(filtroPorUsuario(usuario, query));
}

async function buscarPorIdAutorizado(id, usuario) {
  const projeto = await buscarPorId(id);

  if (!projeto) {
    return { erro: 'Projeto não encontrado', status: 404 };
  }

  if (!usuarioPodeAcessarProjeto(usuario, projeto)) {
    return { erro: 'Permissão insuficiente', status: 403 };
  }

  return { data: projeto };
}

async function criarRegistro(body, usuario) {
  const dados = extrairDados(body);

  if (!dados.nome) {
    return { erro: 'Nome da obra é obrigatório', status: 400 };
  }

  const erroCliente = await validarCliente(dados.clienteId);
  if (erroCliente) {
    return { erro: erroCliente, status: 400 };
  }

  if (!dados.engenheiroId && usuario.role === 'ENGENHEIRO') {
    dados.engenheiroId = usuario.id;
  }

  const erroEngenheiro = await validarEngenheiro(dados.engenheiroId);
  if (erroEngenheiro) {
    return { erro: erroEngenheiro, status: 400 };
  }

  const erroStatus = validarStatus(dados.status);
  if (erroStatus) {
    return { erro: erroStatus, status: 400 };
  }

  const projeto = await criar(dados);
  return { data: await buscarPorId(projeto.id), status: 201 };
}

async function atualizarRegistro(id, body, usuario) {
  const projeto = await buscarPorId(id);

  if (!projeto) {
    return { erro: 'Projeto não encontrado', status: 404 };
  }

  if (!usuarioPodeAcessarProjeto(usuario, projeto)) {
    return { erro: 'Permissão insuficiente', status: 403 };
  }

  const dados = extrairDados(body);

  if (Object.keys(dados).length === 0) {
    return { erro: 'Nenhum dado para atualizar', status: 400 };
  }

  if (dados.clienteId !== undefined) {
    const erroCliente = await validarCliente(dados.clienteId);
    if (erroCliente) {
      return { erro: erroCliente, status: 400 };
    }
  }

  if (dados.engenheiroId !== undefined) {
    const erroEngenheiro = await validarEngenheiro(dados.engenheiroId);
    if (erroEngenheiro) {
      return { erro: erroEngenheiro, status: 400 };
    }
  }

  const erroStatus = validarStatus(dados.status);
  if (erroStatus) {
    return { erro: erroStatus, status: 400 };
  }

  return { data: await atualizar(id, dados) };
}

async function removerRegistro(id, usuario) {
  const projeto = await buscarPorId(id);

  if (!projeto) {
    return { erro: 'Projeto não encontrado', status: 404 };
  }

  if (!usuarioPodeAcessarProjeto(usuario, projeto)) {
    return { erro: 'Permissão insuficiente', status: 403 };
  }

  await remover(id);
  return { data: { mensagem: 'Projeto removido' } };
}

module.exports = {
  listar,
  buscarPorId,
  clienteExiste,
  engenheiroExiste,
  criar,
  atualizar,
  remover,
  listarPorUsuario,
  buscarPorIdAutorizado,
  criarRegistro,
  atualizarRegistro,
  removerRegistro
};
