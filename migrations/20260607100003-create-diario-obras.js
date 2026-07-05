'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('diario_obras', {
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
      etapa: {
        type: Sequelize.STRING,
        allowNull: false
      },
      data: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      hora: {
        type: Sequelize.TIME,
        allowNull: false
      },
      condicaoClimatica: {
        type: Sequelize.ENUM('ENSOLARADO', 'NUBLADO', 'CHUVOSO', 'PARCIALMENTE_NUBLADO'),
        allowNull: false
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: true
      },
      foto: {
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
    await queryInterface.dropTable('diario_obras');
  }
};
