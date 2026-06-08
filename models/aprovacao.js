'use strict';

module.exports = (sequelize, DataTypes) => {
  const Aprovacao = sequelize.define('Aprovacao', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    projetoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    etapaId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    assunto: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('PENDENTE', 'APROVADO', 'AJUSTE_SOLICITADO'),
      allowNull: false,
      defaultValue: 'PENDENTE'
    },
    dispositivoId: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'aprovacoes',
    timestamps: true
  });

  Aprovacao.associate = (models) => {
    Aprovacao.belongsTo(models.Projeto, { foreignKey: 'projetoId', as: 'projeto' });
    Aprovacao.belongsTo(models.Etapa, { foreignKey: 'etapaId', as: 'etapa' });
  };

  return Aprovacao;
};
