'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM('ENGENHEIRO', 'CLIENTE', 'PARCEIRO'),
      allowNull: false,
      defaultValue: 'CLIENTE'
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'users',
    timestamps: true
  });

  User.associate = (models) => {
    User.hasMany(models.RefreshToken, { foreignKey: 'userId', as: 'refreshTokens' });
  };

  return User;
};