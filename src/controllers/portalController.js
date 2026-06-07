function visaoCliente(req, res) {
  return res.status(200).json({
    stub: true,
    mensagem: 'Portal do cliente (stub)',
  });
}

module.exports = { visaoCliente };
