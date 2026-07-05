"use strict";

const bcrypt = require("bcrypt");

const SENHA_PADRAO = "123456";
const AGORA = new Date();

const EMAILS = {
  engenheiro: "engenheiro@gmail.com",
  ana: "cliente@uffs.br",
  bruno: "bruno@uffs.br",
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const senha = await bcrypt.hash(SENHA_PADRAO, 12);

    await queryInterface.bulkInsert("users", [
      {
        nome: "Carlos Engenheiro",
        email: EMAILS.engenheiro,
        senha,
        cpf: "11111111111",
        telefone: "49999990001",
        role: "ENGENHEIRO",
        createdAt: AGORA,
        updatedAt: AGORA,
      },
      {
        nome: "Ana Cliente",
        email: EMAILS.ana,
        senha,
        cpf: "22222222222",
        telefone: "49999990002",
        role: "CLIENTE",
        createdAt: AGORA,
        updatedAt: AGORA,
      },
      {
        nome: "Bruno Cliente",
        email: EMAILS.bruno,
        senha,
        cpf: "33333333333",
        telefone: "49999990003",
        role: "CLIENTE",
        createdAt: AGORA,
        updatedAt: AGORA,
      },
    ]);

    const [usuarios] = await queryInterface.sequelize.query(`
      SELECT id, email FROM users
      WHERE email IN ('${EMAILS.engenheiro}', '${EMAILS.ana}', '${EMAILS.bruno}')
    `);

    const engenheiro = usuarios.find((u) => u.email === EMAILS.engenheiro);
    const ana = usuarios.find((u) => u.email === EMAILS.ana);
    const bruno = usuarios.find((u) => u.email === EMAILS.bruno);

    await queryInterface.bulkInsert("projetos", [
      {
        nome: "Reforma Residencial Centro",
        clienteId: ana.id,
        engenheiroId: engenheiro.id,
        endereco: "Rua das Flores, 100 - Chapecó/SC",
        dataInicioPrevista: "2026-07-01",
        prazoDias: 90,
        orcamento: 85000.0,
        status: "Em execução",
        createdAt: AGORA,
        updatedAt: AGORA,
      },
      {
        nome: "Ampliação Comercial",
        clienteId: bruno.id,
        engenheiroId: engenheiro.id,
        endereco: "Av. Getúlio Vargas, 500 - Chapecó/SC",
        dataInicioPrevista: "2026-08-01",
        prazoDias: 120,
        orcamento: 150000.0,
        status: "Planejamento",
        createdAt: AGORA,
        updatedAt: AGORA,
      },
    ]);

    const [projetos] = await queryInterface.sequelize.query(`
      SELECT id, nome FROM projetos
      WHERE nome IN ('Reforma Residencial Centro', 'Ampliação Comercial')
    `);

    const reforma = projetos.find(
      (p) => p.nome === "Reforma Residencial Centro",
    );
    const ampliacao = projetos.find((p) => p.nome === "Ampliação Comercial");

    await queryInterface.bulkInsert("etapas", [
      {
        projetoId: reforma.id,
        titulo: "Demolição e preparação",
        dataInicioPrevista: "2026-07-01",
        dataFimPrevista: "2026-07-15",
        percentualConclusao: 100,
        responsavel: "Equipe A",
        createdAt: AGORA,
        updatedAt: AGORA,
      },
      {
        projetoId: reforma.id,
        titulo: "Instalações elétricas",
        dataInicioPrevista: "2026-07-16",
        dataFimPrevista: "2026-08-15",
        percentualConclusao: 40,
        responsavel: "Equipe B",
        createdAt: AGORA,
        updatedAt: AGORA,
      },
      {
        projetoId: ampliacao.id,
        titulo: "Fundação",
        dataInicioPrevista: "2026-08-01",
        dataFimPrevista: "2026-09-01",
        percentualConclusao: 0,
        responsavel: "Equipe C",
        createdAt: AGORA,
        updatedAt: AGORA,
      },
    ]);

    await queryInterface.bulkInsert("pagamentos", [
      {
        projetoId: reforma.id,
        valor: 25000.0,
        dataVencimento: "2026-07-10",
        dataPagamento: "2026-07-09",
        status: "PAGO",
        createdAt: AGORA,
        updatedAt: AGORA,
      },
      {
        projetoId: reforma.id,
        valor: 25000.0,
        dataVencimento: "2026-08-10",
        dataPagamento: null,
        status: "PENDENTE",
        createdAt: AGORA,
        updatedAt: AGORA,
      },
      {
        projetoId: ampliacao.id,
        valor: 50000.0,
        dataVencimento: "2026-06-01",
        dataPagamento: null,
        status: "ATRASADO",
        createdAt: AGORA,
        updatedAt: AGORA,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("pagamentos", null, {});
    await queryInterface.bulkDelete("etapas", null, {});
    await queryInterface.bulkDelete("projetos", null, {});
    await queryInterface.bulkDelete("users", null, {});
  },
};
