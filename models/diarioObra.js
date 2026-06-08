'use strict';

module.exports = (sequelize, DataTypes) => {
  const DiarioObra = sequelize.define('DiarioObra', {
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
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    clima: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'diario_obras',
    timestamps: true
  });

  DiarioObra.associate = (models) => {
    DiarioObra.belongsTo(models.Projeto, { foreignKey: 'projetoId', as: 'projeto' });
    DiarioObra.belongsTo(models.Etapa, { foreignKey: 'etapaId', as: 'etapa' });
  };

  return DiarioObra;
};
