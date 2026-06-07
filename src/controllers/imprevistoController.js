function listar(req, res) {
  return res.status(200).json({
    stub: true,
    mensagem: 'Imprevistos (stub)',
    total: 0,
    aprovacoes: []
  });
}

function buscar(req, res) {
  return res.status(200).json({
    stub: true,
    mensagem: 'Imprevisto encontrado (stub)',
    id: req.params.id
  });
}

function criar(req, res) {
  return res.status(201).json({
    stub: true,
    mensagem: 'Imprevisto criado (stub)',
    dados: req.body
  });
}

function atualizar(req, res) {
  return res.status(200).json({
    stub: true,
    mensagem: 'Imprevisto atualizado (stub)',
    id: req.params.id,
    dados: req.body
  });
}

function remover(req, res) {
  return res.status(200).json({
    stub: true,
    mensagem: 'Imprevisto removido (stub)',
    id: req.params.id
  });
}

module.exports = { listar, buscar, criar, atualizar, remover };