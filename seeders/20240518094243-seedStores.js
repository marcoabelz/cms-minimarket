'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let stores = require('../data/stores.json')
  //  console.log(stores);
   stores = stores.map(store => {
    delete store.id
    store.createdAt = store.updatedAt = new Date()
    return store
   })

   await queryInterface.bulkInsert("Stores", stores)

  }, 

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Stores", null, {})
  }
};
