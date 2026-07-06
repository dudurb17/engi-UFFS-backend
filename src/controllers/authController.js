const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

async function registrar(req, res) {
  try {
    const resultado = await UserModel.registrar(req.body);

    if (resultado.erro) {
      return res.status(resultado.status).json({ erro: resultado.erro });
    }

    const token = jwt.sign(
      { id: resultado.data.id, role: resultado.data.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
    );

    return res.status(resultado.status).json({
      ...resultado.data,
      token
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao cadastrar usuário' });
  }
}

async function login(req, res) {
  try {
    const resultado = await UserModel.login(req.body);

    if (resultado.erro) {
      return res.status(resultado.status).json({ erro: resultado.erro });
    }

    const token = jwt.sign(
      { id: resultado.data.id, role: resultado.data.role },
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