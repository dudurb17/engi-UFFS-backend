function listar(req, res) {
  return res.status(200).json({
    stub: true,
    mensagem: 'Aprovações (stub)',
    total: 0,
    aprovacoes: []
  });
}

function buscar(req, res) {
  return res.status(200).json({
    stub: true,
    mensagem: 'Aprovação encontrada (stub)',
    id: req.params.id
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
  const { status, dispositivoId } = req.body;
  const statusValidos = ['APROVADO', 'AJUSTE_SOLICITADO'];

  if (!status || !statusValidos.includes(status)) {
    return res.status(400).json({
      erro: 'Status inválido. Use APROVADO ou AJUSTE_SOLICITADO'
    });
  }

  return res.status(200).json({
    stub: true,
    mensagem: 'Aprovação atualizada (stub)',
    id: req.params.id,

  });
}

function remover(req, res) {
  return res.status(200).json({
    stub: true,
    mensagem: 'Aprovação removida (stub)',
    id: req.params.id
  });
}

module.exports = { listar, buscar, criar, responder, remover };