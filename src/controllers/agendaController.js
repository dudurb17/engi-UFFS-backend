function listar(req, res) {
  if (req.query.id) {
    return buscar(req, res);
  }

  return res.status(200).json({
    stub: true,
    mensagem: 'Agenda (stub)',
    total: 0,
    data: []
  });
}

function buscar(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ erro: 'Id é obrigatório' });
  }

  return res.status(200).json({
    stub: true,
    mensagem: 'Compromisso encontrado (stub)',
    id
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
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ erro: 'Id é obrigatório' });
  }

  return res.status(200).json({
    stub: true,
    mensagem: 'Compromisso atualizado (stub)',
    id,
    dados: req.body
  });
}

function remover(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ erro: 'Id é obrigatório' });
  }

  return res.status(200).json({
    stub: true,
    mensagem: 'Compromisso removido (stub)',
    id
  });
}

module.exports = { listar, solicitar, criar, atualizar, remover };
