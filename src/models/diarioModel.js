const fs = require('fs');
const path = require('path');
const db = require('../../models');
const { usuarioPodeAcessarProjeto } = require('../utils/acesso');

const CAMPOS_PERMITIDOS = [
  'projetoId',
  'etapa',
  'data',
  'hora',
  'condicaoClimatica',
  'descricao'
];

const CONDICOES_VALIDAS = [
  'ENSOLARADO',
  'NUBLADO',
  'CHUVOSO',
  'PARCIALMENTE_NUBLADO'
];

const includeProjeto = {
  model: db.Projeto,
  as: 'projeto',
  attributes: ['id', 'nome', 'clienteId', 'engenheiroId']
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
  }

  if (query.projetoId) {
    filtros.projetoId = query.projetoId;
  }

  return filtros;
}

function validarCondicaoClimatica(condicaoClimatica) {
  if (!condicaoClimatica) {
    return 'Condição climática é obrigatória';
  }

  if (!CONDICOES_VALIDAS.includes(condicaoClimatica)) {
    return 'Condição climática inválida';
  }

  return null;
}

function validarCamposObrigatorios(dados) {
  if (!dados.etapa) {
    return 'Etapa é obrigatória';
  }

  if (!dados.data) {
    return 'Data é obrigatória';
  }

  if (!dados.hora) {
    return 'Hora é obrigatória';
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

function removerArquivoFoto(fotoUrl) {
  if (!fotoUrl) {
    return;
  }

  const caminho = path.join(__dirname, '..', '..', fotoUrl);

  if (fs.existsSync(caminho)) {
    fs.unlinkSync(caminho);
  }
}

async function listar(filtros = {}) {
  const { clienteId, engenheiroId, ...where } = filtros;
  const include = [{ ...includeProjeto }];

  if (clienteId || engenheiroId) {
    include[0].where = {};

    if (clienteId) {
      include[0].where.clienteId = clienteId;
    }

    if (engenheiroId) {
      include[0].where.engenheiroId = engenheiroId;
    }

    include[0].required = true;
  }

  return db.DiarioObra.findAll({
    where,
    include,
    order: [['data', 'DESC'], ['hora', 'DESC']]
  });
}

async function buscarPorId(id) {
  return db.DiarioObra.findByPk(id, {
    include: [includeProjeto]
  });
}

async function projetoExiste(projetoId) {
  return db.Projeto.findByPk(projetoId);
}

async function criar(dados) {
  return db.DiarioObra.create(dados);
}

async function atualizar(id, dados) {
  const diario = await db.DiarioObra.findByPk(id);

  if (!diario) {
    return null;
  }

  await diario.update(dados);
  return buscarPorId(id);
}

async function remover(id) {
  const diario = await db.DiarioObra.findByPk(id);

  if (!diario) {
    return null;
  }

  await diario.destroy();
  return diario;
}

async function listarPorUsuario(usuario, query = {}) {
  return listar(filtroPorUsuario(usuario, query));
}

async function buscarPorIdAutorizado(id, usuario) {
  const diario = await buscarPorId(id);

  if (!diario) {
    return { erro: 'Registro de diário não encontrado', status: 404 };
  }

  if (!usuarioPodeAcessarProjeto(usuario, diario.projeto)) {
    return { erro: 'Permissão insuficiente', status: 403 };
  }

  return { data: diario };
}

async function criarRegistro(body, usuario) {
  if (usuario.role !== 'ENGENHEIRO') {
    return { erro: 'Permissão insuficiente', status: 403 };
  }

  const dados = extrairDados(body);
  const resultadoProjeto = await validarProjeto(dados.projetoId);

  if (resultadoProjeto.erro) {
    return { erro: resultadoProjeto.erro, status: 400 };
  }

  if (!usuarioPodeAcessarProjeto(usuario, resultadoProjeto.projeto)) {
    return { erro: 'Permissão insuficiente', status: 403 };
  }

  const erroCampos = validarCamposObrigatorios(dados);
  if (erroCampos) {
    return { erro: erroCampos, status: 400 };
  }

  const erroCondicao = validarCondicaoClimatica(dados.condicaoClimatica);
  if (erroCondicao) {
    return { erro: erroCondicao, status: 400 };
  }

  const diario = await criar(dados);
  return { data: await buscarPorId(diario.id), status: 201 };
}

async function atualizarRegistro(id, body, usuario) {
  const diario = await buscarPorId(id);

  if (!diario) {
    return { erro: 'Registro de diário não encontrado', status: 404 };
  }

  if (!usuarioPodeAcessarProjeto(usuario, diario.projeto)) {
    return { erro: 'Permissão insuficiente', status: 403 };
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

    if (!usuarioPodeAcessarProjeto(usuario, resultadoProjeto.projeto)) {
      return { erro: 'Permissão insuficiente', status: 403 };
    }
  }

  if (dados.condicaoClimatica !== undefined) {
    const erroCondicao = validarCondicaoClimatica(dados.condicaoClimatica);
    if (erroCondicao) {
      return { erro: erroCondicao, status: 400 };
    }
  }

  return { data: await atualizar(id, dados) };
}

async function removerRegistro(id, usuario) {
  const diario = await buscarPorId(id);

  if (!diario) {
    return { erro: 'Registro de diário não encontrado', status: 404 };
  }

  if (!usuarioPodeAcessarProjeto(usuario, diario.projeto)) {
    return { erro: 'Permissão insuficiente', status: 403 };
  }

  removerArquivoFoto(diario.foto);
  await remover(id);
  return { data: { mensagem: 'Registro de diário removido' } };
}

async function atualizarFoto(id, filename, usuario) {
  const diario = await buscarPorId(id);

  if (!diario) {
    return { erro: 'Registro de diário não encontrado', status: 404 };
  }

  if (!usuarioPodeAcessarProjeto(usuario, diario.projeto)) {
    return { erro: 'Permissão insuficiente', status: 403 };
  }

  if (diario.foto) {
    removerArquivoFoto(diario.foto);
  }

  const fotoUrl = `/uploads/diarios/${filename}`;
  return { data: await atualizar(id, { foto: fotoUrl }) };
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
  removerRegistro,
  atualizarFoto
};
