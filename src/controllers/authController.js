function registrar(req, res) {
  return res.status(201).json({ mensagem: 'Cadastro recebido' });
}

function login(req, res) {
  return res.status(200).json({ mensagem: 'Login recebido' });
}

function perfil(req, res) {
  return res.json({
    mensagem: 'Perfil autenticado',
    usuario: req.usuario
  });
}

module.exports = { registrar, login, perfil };