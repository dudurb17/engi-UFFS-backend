'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('agenda', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      data: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      horaInicio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      horaFim: {
        type: Sequelize.STRING,
        allowNull: true
      },
      local: {
        type: Sequelize.STRING,
        allowNull: true
      },
      projetoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'projetos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      status: {
        type: Sequelize.ENUM('AGENDADA', 'REALIZADA', 'CANCELADA'),
        allowNull: false,
        defaultValue: 'AGENDADA'
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
    await queryInterface.dropTable('agenda');
  }
};
