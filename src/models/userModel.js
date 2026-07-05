const bcrypt = require('bcrypt');
const db = require('../../models');

const SALT_ROUNDS = 12;
const ROLES_VALIDOS = ['ENGENHEIRO', 'CLIENTE', 'PARCEIRO'];
const HASH_FICTICIO = '$2b$12$invalidhashinvalidhashinvalidhashinvalidhashinvali';

function validarRole(role) {
  return !role || ROLES_VALIDOS.includes(role);
}

async function buscarPorEmail(email) {
  return db.User.findOne({ where: { email } });
}

async function buscarPorId(id) {
  return db.User.findByPk(id, {
    attributes: { exclude: ['senha'] }
  });
}

async function listar(filtros = {}) {
  const where = {};

  if (filtros.role) {
    where.role = filtros.role;
  }

  return db.User.findAll({
    where,
    attributes: { exclude: ['senha'] },
    order: [['nome', 'ASC']]
  });
}

async function emailJaExiste(email) {
  const usuario = await buscarPorEmail(email);
  return !!usuario;
}

async function criar({ nome, email, senha, role }) {
  const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);

  return db.User.create({
    nome,
    email,
    senha: senhaHash,
    role: role || 'CLIENTE'
  });
}

async function validarCredenciais(email, senha) {
  const usuario = await buscarPorEmail(email);
  const senhaValida = await bcrypt.compare(senha, usuario?.senha ?? HASH_FICTICIO);

  if (!usuario || !senhaValida) {
    return null;
  }

  return usuario;
}

module.exports = {
  ROLES_VALIDOS,
  validarRole,
  buscarPorId,
  listar,
  emailJaExiste,
  criar,
  validarCredenciais
};