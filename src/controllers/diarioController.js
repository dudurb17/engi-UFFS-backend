function listar(req, res) {
  return res.status(200).json({
    stub: true,
    mensagem: 'Diário de obras (stub)',
    total: 0,
    registros: []
  });
}

function buscar(req, res) {
  return res.status(200).json({
    stub: true,
    mensagem: 'Registro de diário encontrado (stub)',
    id: req.params.id
  });
}

function criar(req, res) {
  return res.status(201).json({
    stub: true,
    mensagem: 'Registro de diário criado (stub)',
    dados: req.body
  });
}

function atualizar(req, res) {
  return res.status(200).json({
    stub: true,
    mensagem: 'Registro de diário atualizado (stub)',
    id: req.params.id,
    dados: req.body
  });
}

function remover(req, res) {
  return res.status(200).json({
    stub: true,
    mensagem: 'Registro de diário removido (stub)',
    id: req.params.id
  });
}

module.exports = { listar, buscar, criar, atualizar, remover };