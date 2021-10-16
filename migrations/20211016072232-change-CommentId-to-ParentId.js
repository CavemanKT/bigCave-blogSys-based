'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Comments', 'CommentId')
    await queryInterface.addColumn('Comments', 'ParentId', {
      type: Sequelize.INTEGER,
      allowNull: true
    })
    await queryInterface.removeColumn('Users', 'offset')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Comments', 'ParentId')
    await queryInterface.addColumn('Comments', 'CommentId', {
      type: Sequelize.INTEGER,
      allowNull: true
    })
    await queryInterface.addColumn('Users', 'offset', {
      type: Sequelize.INTEGER,
      allowNull: true
    })
  }
};
