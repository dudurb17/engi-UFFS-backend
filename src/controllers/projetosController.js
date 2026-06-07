function listar(req, res) {
  return res.status(200).json({
    stub: true,
    mensagem: 'Lista de projetos (stub)',
    total: 0,
    projetos: []
  });
}

function buscar(req, res) {
  return res.status(200).json({
    stub: true,
    mensagem: 'Projeto encontrado (stub)',
    id: req.params.id
  });
}

function criar(req, res) {
  return res.status(201).json({
    stub: true,
    mensagem: 'Projeto criado (stub)',
    dados: req.body
  });
}

function atualizar(req, res) {
  return res.status(200).json({
    stub: true,
    mensagem: 'Projeto atualizado (stub)',
    id: req.params.id,
    dados: req.body
  });
}

function remover(req, res) {
  return res.status(200).json({
    stub: true,
    mensagem: 'Projeto removido (stub)',
    id: req.params.id
  });
}

module.exports = { listar, buscar, criar, atualizar, remover };
