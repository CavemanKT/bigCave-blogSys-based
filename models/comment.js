'use strict';
const {
  Model
} = require('sequelize');
const CommentSchema = require('./schema/comment')
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {

    static associate(models) {
      Comment.Post = this.belongsTo(models.Post)
      Comment.User = this.belongsTo(models.User)
      // I was gonna add association with other comments, I won't touch this part until I found the solution
    }
  };
  const { tableAttributes } = CommentSchema( sequelize, DataTypes )
  Comment.init( tableAttributes, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
