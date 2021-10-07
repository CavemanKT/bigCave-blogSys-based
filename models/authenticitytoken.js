'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AuthenticityToken extends Model {
    static associate(models) {
      AuthenticityToken.User = this.belongsTo(models.User)
    }
  };
  AuthenticityToken.init({
    token: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AuthenticityToken',
  });
  return AuthenticityToken;
};
