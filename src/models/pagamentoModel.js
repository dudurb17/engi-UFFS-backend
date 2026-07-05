const db = require('../../models');

const CAMPOS_PERMITIDOS = [
  'projetoId',
  'valor',
  'dataVencimento',
  'dataPagamento',
  'status'
];

const STATUS_VALIDOS = ['PENDENTE', 'PAGO', 'ATRASADO'];

const includeProjeto = {
  model: db.Projeto,
  as: 'projeto',
  attributes: ['id', 'nome', 'status', 'clienteId']
};

function extrairDados(body) {
  return CAMPOS_PERMITIDOS.reduce((dados, campo) => {
    if (body[campo] !== undefined) {
      dados[campo] = body[campo];
    }
    return dados;
  }, {});
}

function filtroPorUsuario(usuario) {
  if (usuario.role === 'CLIENTE') {
    return { clienteId: usuario.id };
  }
  return {};
}

function validarStatus(status) {
  if (status && !STATUS_VALIDOS.includes(status)) {
    return 'Status inválido. Use PENDENTE, PAGO ou ATRASADO';
  }
  return null;
}

async function validarProjeto(projetoId) {
  if (!projetoId) {
    return { erro: 'Projeto é obrigatório' };
  }

  const projeto = await projetoExiste(projetoId);
  if (!projeto) {
    return { erro: 'Projeto não encontrado' };
  }

  return { projeto };
}

async function listar(filtros = {}) {
  const { clienteId, ...where } = filtros;
  const include = [{ ...includeProjeto }];

  if (clienteId) {
    include[0].where = { clienteId };
    include[0].required = true;
  }

  return db.Pagamento.findAll({
    where,
    include,
    order: [['createdAt', 'DESC']]
  });
}

async function buscarPorId(id) {
  return db.Pagamento.findByPk(id, {
    include: [includeProjeto]
  });
}

async function projetoExiste(projetoId) {
  return db.Projeto.findByPk(projetoId);
}

async function criar(dados) {
  return db.Pagamento.create(dados);
}

async function atualizar(id, dados) {
  const pagamento = await db.Pagamento.findByPk(id);

  if (!pagamento) {
    return null;
  }

  await pagamento.update(dados);
  return buscarPorId(id);
}

async function remover(id) {
  const pagamento = await db.Pagamento.findByPk(id);

  if (!pagamento) {
    return false;
  }

  await pagamento.destroy();
  return true;
}

async function listarPorUsuario(usuario) {
  return listar(filtroPorUsuario(usuario));
}

async function buscarPorIdAutorizado(id, usuario) {
  const pagamento = await buscarPorId(id);

  if (!pagamento) {
    return { erro: 'Pagamento não encontrado', status: 404 };
  }

  if (
    usuario.role === 'CLIENTE' &&
    pagamento.projeto?.clienteId !== usuario.id
  ) {
    return { erro: 'Permissão insuficiente', status: 403 };
  }

  return { data: pagamento };
}

async function criarRegistro(body) {
  const dados = extrairDados(body);
  const resultadoProjeto = await validarProjeto(dados.projetoId);

  if (resultadoProjeto.erro) {
    return { erro: resultadoProjeto.erro, status: 400 };
  }

  if (dados.valor === undefined || dados.valor === null) {
    return { erro: 'Valor é obrigatório', status: 400 };
  }

  const erroStatus = validarStatus(dados.status);
  if (erroStatus) {
    return { erro: erroStatus, status: 400 };
  }

  const pagamento = await criar(dados);
  return { data: await buscarPorId(pagamento.id), status: 201 };
}

async function atualizarRegistro(id, body) {
  const pagamento = await buscarPorId(id);

  if (!pagamento) {
    return { erro: 'Pagamento não encontrado', status: 404 };
  }

  const dados = extrairDados(body);

  if (Object.keys(dados).length === 0) {
    return { erro: 'Nenhum dado para atualizar', status: 400 };
  }

  if (dados.projetoId !== undefined) {
    const resultadoProjeto = await validarProjeto(dados.projetoId);
    if (resultadoProjeto.erro) {
      return { erro: resultadoProjeto.erro, status: 400 };
    }
  }

  const erroStatus = validarStatus(dados.status);
  if (erroStatus) {
    return { erro: erroStatus, status: 400 };
  }

  return { data: await atualizar(id, dados) };
}

async function removerRegistro(id) {
  const pagamento = await buscarPorId(id);

  if (!pagamento) {
    return { erro: 'Pagamento não encontrado', status: 404 };
  }

  await remover(id);
  return { data: { mensagem: 'Pagamento removido' } };
}

module.exports = {
  listar,
  buscarPorId,
  projetoExiste,
  criar,
  atualizar,
  remover,
  listarPorUsuario,
  buscarPorIdAutorizado,
  criarRegistro,
  atualizarRegistro,
  removerRegistro
};
