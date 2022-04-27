'use strict';

// const { now } = require("sequelize/types/utils");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'usuario', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nome: {
        type: Sequelize.DataTypes.STRING,
      },
      login: {
        type: Sequelize.DataTypes.STRING,
      },
      senha: {
        type: Sequelize.DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      }

    }, {
      timestamps: true,

    });

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('usuario');
  }
};
