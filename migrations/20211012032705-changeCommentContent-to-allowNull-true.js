'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Comments', 'content')
    await queryInterface.addColumn('Comments', 'content', {
      type: Sequelize.TEXT('long'),
      allowNull: true
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Comments', 'content')
    await queryInterface.addColumn('Comments', 'content', {
      type: Sequelize.TEXT('long'),
      allowNull: false
    })
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
