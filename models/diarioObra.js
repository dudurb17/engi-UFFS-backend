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
    etapa: {
      type: DataTypes.STRING,
      allowNull: false
    },
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false
    },
    condicaoClimatica: {
      type: DataTypes.ENUM('ENSOLARADO', 'NUBLADO', 'CHUVOSO', 'PARCIALMENTE_NUBLADO'),
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: true
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'diario_obras',
    timestamps: true
  });

  DiarioObra.associate = (models) => {
    DiarioObra.belongsTo(models.Projeto, { foreignKey: 'projetoId', as: 'projeto' });
  };

  return DiarioObra;
};
