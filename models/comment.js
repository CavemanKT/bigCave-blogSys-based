'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {

    static associate(models) {
      Comment.Post = this.belongsTo(models.Post)
      // I was gonna add association with other comments, I won't touch this part until I found the solution
    }
  };
  Comment.init({
    content: DataTypes.TEXT,
    postId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
