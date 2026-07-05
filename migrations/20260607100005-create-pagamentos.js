'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pagamentos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      projetoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'projetos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      valor: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false
      },
      dataVencimento: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      dataPagamento: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('PENDENTE', 'PAGO', 'ATRASADO'),
        allowNull: false,
        defaultValue: 'PENDENTE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('pagamentos');
  }
};
