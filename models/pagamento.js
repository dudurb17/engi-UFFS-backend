'use strict';

module.exports = (sequelize, DataTypes) => {
  const Pagamento = sequelize.define('Pagamento', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    projetoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    valor: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    dataVencimento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    dataPagamento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('PENDENTE', 'PAGO', 'ATRASADO'),
      allowNull: false,
      defaultValue: 'PENDENTE'
    }
  }, {
    tableName: 'pagamentos',
    timestamps: true
  });

  Pagamento.associate = (models) => {
    Pagamento.belongsTo(models.Projeto, { foreignKey: 'projetoId', as: 'projeto' });
  };

  return Pagamento;
};
