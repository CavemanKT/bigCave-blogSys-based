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
      Comment.Comment = this.belongsTo(models.Comment, {
        as: "Parent"
      })
      Comment.Comment = this.hasMany(models.Comment, {
        as: "Children",
        foreignKey: "CommentId"
      })
    }
  };
  const { tableAttributes } = CommentSchema( sequelize, DataTypes )
  Comment.init( tableAttributes, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
