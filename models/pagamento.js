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
    clienteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: true
    },
    valorTotal: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true
    },
    numeroParcelas: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    valorParcela: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true
    },
    valorPago: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
      defaultValue: 0
    },
    valorEmAberto: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true
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
    Pagamento.belongsTo(models.User, { foreignKey: 'clienteId', as: 'cliente' });
  };

  return Pagamento;
};
