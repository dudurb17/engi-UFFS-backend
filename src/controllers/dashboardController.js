function visaoGeral(req, res) {
  return res.status(200).json({
    stub: true,
    mensagem: 'Dashboard do engenheiro (stub)',
  });
}

module.exports = { visaoGeral };
