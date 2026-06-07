function listar(req, res) {
  return res.status(200).json({
    stub: true,
    mensagem: 'Pagamentos (stub)',
    total: 0,
    pagamentos: []
  });
}

function buscar(req, res) {
  return res.status(200).json({
    stub: true,
    mensagem: 'Pagamento encontrado (stub)',
    id: req.params.id
  });
}

function criar(req, res) {
  return res.status(201).json({
    stub: true,
    mensagem: 'Pagamento registrado (stub)',
    dados: req.body
  });
}

function atualizar(req, res) {
  return res.status(200).json({
    stub: true,
    mensagem: 'Pagamento atualizado (stub)',
    id: req.params.id,
    dados: req.body
  });
}

function remover(req, res) {
  return res.status(200).json({
    stub: true,
    mensagem: 'Pagamento removido (stub)',
    id: req.params.id
  });
}

module.exports = { listar, buscar, criar, atualizar, remover };