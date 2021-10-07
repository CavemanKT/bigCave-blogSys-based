'use strict';
const {
  Model
} = require('sequelize');
const PostSchema = require('./schema/post')
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.Comments = this.hasMany(models.Comment)
      Post.User = this.belongsTo(models.User)
    }
  };
  const { tableAttributes } = PostSchema( sequelize, DataTypes )
  Post.init( tableAttributes, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
