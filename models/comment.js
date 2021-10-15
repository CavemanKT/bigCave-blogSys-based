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
      // Comment.Children = this.belongsTo(models.Comment, { as: 'Parent' })
      // Comment.Parent = this.hasMany(models.Comment, { as: 'Children', foreignKey: 'ParentId' })
    }
  };
  const { tableAttributes } = CommentSchema( sequelize, DataTypes )
  Comment.init( tableAttributes, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};


// await Post.findAll({
//   include: {
//     association: Post.Comments,
//     include: {
//       association: Comment.Children,
//       include: Comment.Children
//     }
//   }
// })


// posts = [
//   {
//     content: 'ASDF',
//     Comments: [
//       {
//         content: 'First Layer 1',
//         Children: [
//           {
//             content: 'Second Layer 1',
//             Children: [
//               {
//                 content: 'Third Layer 1'
//               }
//             ]
//           }
//         ]
//       }, {
//         content: 'First Layer 2',
//         Children: [
//           {
//             content: 'Second Layer 1',
//             Children: [
//               {
//                 content: 'Third Layer 1'
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   }
// ]
