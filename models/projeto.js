'use strict';

module.exports = (sequelize, DataTypes) => {
  const Projeto = sequelize.define('Projeto', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clienteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dataInicioPrevista: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    prazoDias: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    orcamento: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'EM_ANDAMENTO'
    }
  }, {
    tableName: 'projetos',
    timestamps: true
  });

  Projeto.associate = (models) => {
    Projeto.belongsTo(models.User, { foreignKey: 'clienteId', as: 'cliente' });
    Projeto.hasMany(models.Etapa, { foreignKey: 'projetoId', as: 'etapas' });
    Projeto.hasMany(models.DiarioObra, { foreignKey: 'projetoId', as: 'diarios' });
    Projeto.hasMany(models.Aprovacao, { foreignKey: 'projetoId', as: 'aprovacoes' });
    Projeto.hasMany(models.Pagamento, { foreignKey: 'projetoId', as: 'pagamentos' });
    Projeto.hasMany(models.Agenda, { foreignKey: 'projetoId', as: 'agenda' });
    Projeto.hasMany(models.Imprevisto, { foreignKey: 'projetoId', as: 'imprevistos' });
  };

  return Projeto;
};
