'use strict';

module.exports = (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define('RefreshToken', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    revokedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'refresh_tokens',
    timestamps: true
  });

  RefreshToken.associate = (models) => {
    RefreshToken.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return RefreshToken;
};