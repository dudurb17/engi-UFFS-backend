const db = require('../../models');

const includeCliente = {
  model: db.User,
  as: 'cliente',
  attributes: ['id', 'nome', 'email']
};

async function listar(filtros = {}) {
  return db.Projeto.findAll({
    where: filtros,
    include: [includeCliente],
    order: [['createdAt', 'DESC']]
  });
}

async function buscarPorId(id) {
  return db.Projeto.findByPk(id, {
    include: [includeCliente]
  });
}

async function clienteExiste(clienteId) {
  const cliente = await db.User.findOne({
    where: { id: clienteId, role: 'CLIENTE' }
  });
  return !!cliente;
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

module.exports = {
  listar,
  buscarPorId,
  clienteExiste,
  criar,
  atualizar,
  remover
};
