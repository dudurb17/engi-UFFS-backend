function listar(req, res) {
  return res.status(200).json({
    stub: true,
    mensagem: 'Agenda (stub)',
    total: 0,
    compromissos: []
  });
}

function buscar(req, res) {
  return res.status(200).json({
    stub: true,
    mensagem: 'Compromisso encontrado (stub)',
    id: req.params.id
  });
}

function solicitar(req, res) {
  return res.status(201).json({
    stub: true,
    mensagem: 'Solicitação de visita enviada (stub)',
  });
}

function criar(req, res) {
  return res.status(201).json({
    stub: true,
    mensagem: 'Compromisso agendado (stub)',
    dados: req.body
  });
}

function atualizar(req, res) {
  return res.status(200).json({
    stub: true,
    mensagem: 'Compromisso atualizado (stub)',
    id: req.params.id,
    dados: req.body
  });
}

function remover(req, res) {
  return res.status(200).json({
    stub: true,
    mensagem: 'Compromisso removido (stub)',
    id: req.params.id
  });
}

module.exports = { listar, buscar, solicitar, criar, atualizar, remover };