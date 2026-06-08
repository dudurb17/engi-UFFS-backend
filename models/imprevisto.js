'use strict';

module.exports = (sequelize, DataTypes) => {
  const Imprevisto = sequelize.define('Imprevisto', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    projetoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    gravidade: {
      type: DataTypes.STRING,
      allowNull: true
    },
    statusResolucao: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'ABERTO'
    },
    historico: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'imprevistos',
    timestamps: true
  });

  Imprevisto.associate = (models) => {
    Imprevisto.belongsTo(models.Projeto, { foreignKey: 'projetoId', as: 'projeto' });
  };

  return Imprevisto;
};
