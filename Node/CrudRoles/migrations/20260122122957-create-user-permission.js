'use strict';

/** @type {import('sequelize-cli').Migration} */
export default{
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("user_permission", {
      user_per_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "user_id"
        },
        onDelete: "CASCADE"
      },
      permission_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "permission",
          key: "permission_id"
        },
        onDelete: "CASCADE"
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    });

    await queryInterface.createTable("user_permission", {
      user_per_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "user_id"
        },
        onDelete: "CASCADE"
      },
      permission_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "permission",
          key: "permission_id"
        },
        onDelete: "CASCADE"
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    }); 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("user_permission");
  }
};
