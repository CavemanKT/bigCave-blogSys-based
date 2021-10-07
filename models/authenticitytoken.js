'use strict';
const {
  Model
} = require('sequelize');
const AuthenticityTokenSchema = require('./schema/authenticity_token')
module.exports = (sequelize, DataTypes) => {
  class AuthenticityToken extends Model {
    static associate(models) {
      AuthenticityToken.User = this.belongsTo(models.User)
    }
  };
  const { tableAttributes } = AuthenticityTokenSchema( sequelize, DataTypes )
  AuthenticityToken.init(tableAttributes, {
    sequelize,
    modelName: 'AuthenticityToken',
  });
  return AuthenticityToken;
};
