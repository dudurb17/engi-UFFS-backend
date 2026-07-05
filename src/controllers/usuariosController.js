const UserModel = require('../models/userModel');

async function listar(req, res) {
  try {
    const { role } = req.query;

    if (role && !UserModel.validarRole(role)) {
      return res.status(400).json({ erro: 'Perfil inválido' });
    }

    const usuarios = await UserModel.listar({ role });

    return res.status(200).json({
      total: usuarios.length,
      usuarios
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao listar usuários' });
  }
}

module.exports = { listar };
