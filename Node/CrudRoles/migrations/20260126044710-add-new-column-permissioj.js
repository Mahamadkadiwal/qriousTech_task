'use strict';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE permission
      ADD COLUMN feature VARCHAR(255) NOT NULL AFTER permission_id;
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE permission
      DROP COLUMN feature;
    `);
  }
};
