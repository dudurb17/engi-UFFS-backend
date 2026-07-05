'use strict';

module.exports = (sequelize, DataTypes) => {
  const Etapa = sequelize.define('Etapa', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    projetoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dataInicioPrevista: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    dataInicioReal: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    dataFimPrevista: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    dataFimReal: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    percentualConclusao: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    responsavel: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'etapas',
    timestamps: true
  });

  Etapa.associate = (models) => {
    Etapa.belongsTo(models.Projeto, { foreignKey: 'projetoId', as: 'projeto' });
    Etapa.hasMany(models.Aprovacao, { foreignKey: 'etapaId', as: 'aprovacoes' });
  };

  return Etapa;
};
