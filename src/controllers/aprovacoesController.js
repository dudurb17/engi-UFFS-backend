function listar(req, res) {
  if (req.query.id) {
    return buscar(req, res);
  }

  return res.status(200).json({
    stub: true,
    mensagem: 'Aprovações (stub)',
    total: 0,
    aprovacoes: []
  });
}

function buscar(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ erro: 'Id é obrigatório' });
  }

  return res.status(200).json({
    stub: true,
    mensagem: 'Aprovação encontrada (stub)',
    id
  });
}

function criar(req, res) {
  return res.status(201).json({
    stub: true,
    mensagem: 'Aprovação criada (stub)',
    dados: req.body
  });
}

function responder(req, res) {
  const { id } = req.query;
  const { status, dispositivoId } = req.body;
  const statusValidos = ['APROVADO', 'AJUSTE_SOLICITADO'];

  if (!id) {
    return res.status(400).json({ erro: 'Id é obrigatório' });
  }

  if (!status || !statusValidos.includes(status)) {
    return res.status(400).json({
      erro: 'Status inválido. Use APROVADO ou AJUSTE_SOLICITADO'
    });
  }

  return res.status(200).json({
    stub: true,
    mensagem: 'Aprovação atualizada (stub)',
    id,
    status,
    dispositivoId
  });
}

function remover(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ erro: 'Id é obrigatório' });
  }

  return res.status(200).json({
    stub: true,
    mensagem: 'Aprovação removida (stub)',
    id
  });
}

module.exports = { listar, criar, responder, remover };
