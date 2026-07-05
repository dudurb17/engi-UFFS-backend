function respostaLista(res, itens, status = 200) {
  return res.status(status).json({
    total: itens.length,
    data: itens
  });
}

function respostaItem(res, item, status = 200) {
  return res.status(status).json({ data: item });
}

function respostaMensagem(res, mensagem, status = 200) {
  return res.status(status).json({ data: { mensagem } });
}

module.exports = { respostaLista, respostaItem, respostaMensagem };
