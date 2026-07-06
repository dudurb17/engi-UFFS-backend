const db = require('../../models');

async function agregar() {
  const [
    totalProjetos,
    totalDiarios,
    totalPagamentos,
    projetosEmExecucao,
    pagamentosPendentes,
    pagamentosAtrasados
  ] = await Promise.all([
    db.Projeto.count(),
    db.DiarioObra.count(),
    db.Pagamento.count(),
    db.Projeto.count({ where: { status: 'Em execução' } }),
    db.Pagamento.count({ where: { status: 'PENDENTE' } }),
    db.Pagamento.count({ where: { status: 'ATRASADO' } })
  ]);

  return {
    totalProjetos,
    totalDiarios,
    totalPagamentos,
    projetosEmExecucao,
    pagamentosPendentes,
    pagamentosAtrasados
  };
}

module.exports = { agregar };
