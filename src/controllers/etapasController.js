function listar(req, res) {
  return res.status(200).json({
    stub: true,
    mensagem: 'Lista de etapas (stub)',
    total: 0,
    etapas: []
  });
}

function buscar(req, res) {
  return res.status(200).json({
    stub: true,
    mensagem: 'Etapa encontrada (stub)',
    id: req.params.id
  });
}

function criar(req, res) {
  return res.status(201).json({
    stub: true,
    mensagem: 'Etapa criada (stub)',
    dados: req.body
  });
}

function atualizar(req, res) {
  return res.status(200).json({
    stub: true,
    mensagem: 'Etapa atualizada (stub)',
    id: req.params.id,
    dados: req.body
  });
}

function remover(req, res) {
  return res.status(200).json({
    stub: true,
    mensagem: 'Etapa removida (stub)',
    id: req.params.id
  });
}

module.exports = { listar, buscar, criar, atualizar, remover };
