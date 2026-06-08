'use strict';

module.exports = (sequelize, DataTypes) => {
  const Agenda = sequelize.define('Agenda', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    horaInicio: {
      type: DataTypes.STRING,
      allowNull: true
    },
    horaFim: {
      type: DataTypes.STRING,
      allowNull: true
    },
    local: {
      type: DataTypes.STRING,
      allowNull: true
    },
    projetoId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('AGENDADA', 'REALIZADA', 'CANCELADA'),
      allowNull: false,
      defaultValue: 'AGENDADA'
    }
  }, {
    tableName: 'agenda',
    timestamps: true
  });

  Agenda.associate = (models) => {
    Agenda.belongsTo(models.Projeto, { foreignKey: 'projetoId', as: 'projeto' });
  };

  return Agenda;
};
