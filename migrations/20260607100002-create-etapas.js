'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('etapas', {
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
      titulo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dataInicioPrevista: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      dataInicioReal: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      dataFimPrevista: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      dataFimReal: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      percentualConclusao: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      responsavel: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('etapas');
  }
};
