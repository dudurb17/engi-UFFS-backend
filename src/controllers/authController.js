const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

async function registrar(req, res) {
  try {
    const { nome, email, senha, role } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Nome, e-mail e senha são obrigatórios' });
    }

    if (!UserModel.validarRole(role)) {
      return res.status(400).json({ erro: 'Perfil inválido' });
    }

    if (await UserModel.emailJaExiste(email)) {
      return res.status(409).json({ erro: 'E-mail já cadastrado' });
    }

    const usuario = await UserModel.criar({ nome, email, senha, role });

    return res.status(201).json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao cadastrar usuário' });
  }
}

async function login(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: 'E-mail e senha são obrigatórios' });
    }

    const usuario = await UserModel.validarCredenciais(email, senha);

    if (!usuario) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: usuario.id, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
    );

    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao fazer login' });
  }
}

async function perfil(req, res) {
  try {
    const usuario = await UserModel.buscarPorId(req.usuario.id);

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    return res.json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao buscar perfil' });
  }
}

module.exports = { registrar, login, perfil };