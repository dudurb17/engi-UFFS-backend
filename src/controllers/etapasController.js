function listar(req, res) {
  if (req.query.id) {
    return buscar(req, res);
  }

  return res.status(200).json({
    stub: true,
    mensagem: 'Lista de etapas (stub)',
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
    mensagem: 'Etapa encontrada (stub)',
    id
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
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ erro: 'Id é obrigatório' });
  }

  return res.status(200).json({
    stub: true,
    mensagem: 'Etapa atualizada (stub)',
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
    mensagem: 'Etapa removida (stub)',
    id
  });
}

module.exports = { listar, criar, atualizar, remover };
