function listar(req, res) {
  if (req.query.id) {
    return buscar(req, res);
  }

  return res.status(200).json({
    stub: true,
    mensagem: 'Diário de obras (stub)',
    total: 0,
    registros: []
  });
}

function buscar(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ erro: 'Id é obrigatório' });
  }

  return res.status(200).json({
    stub: true,
    mensagem: 'Registro de diário encontrado (stub)',
    id
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
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ erro: 'Id é obrigatório' });
  }

  return res.status(200).json({
    stub: true,
    mensagem: 'Registro de diário atualizado (stub)',
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
    mensagem: 'Registro de diário removido (stub)',
    id
  });
}

module.exports = { listar, criar, atualizar, remover };
