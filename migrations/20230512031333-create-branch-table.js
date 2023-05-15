'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    await queryInterface.createTable('Branchs', {
      id: { 
        allowNull:false,
        autoIncrement:true,
        primaryKey:true, 
        type: Sequelize.INTEGER
      },
      branchName : {
        type:Sequelize.STRING
      },
      address:{
        type:Sequelize.STRING
      }
    });

  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.dropTable('Branchs')
  }
};
