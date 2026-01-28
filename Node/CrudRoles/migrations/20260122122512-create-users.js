'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: Sequelize.STRING,
      email: { type: Sequelize.STRING, unique: true },
      password: Sequelize.STRING,
      role: {
        type: Sequelize.ENUM('admin','user','manager'),
        defaultValue: 'user'
      },
      status: {
        type: Sequelize.ENUM('active','inactive','delete'),
        defaultValue: 'active'
      },
      delele: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  }
};
