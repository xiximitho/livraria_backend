"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "livros",
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        author: {
          type: Sequelize.DataTypes.STRING,
        },
        bookformat: {
          type: Sequelize.DataTypes.STRING,
        },
        desc: {
          type: Sequelize.DataTypes.STRING,
        },
        genre: {
          type: Sequelize.DataTypes.STRING,
        },
        img: {
          type: Sequelize.DataTypes.STRING,
        },
        isbn: {
          type: Sequelize.DataTypes.STRING,
        },
        isbn13: {
          type: Sequelize.DataTypes.STRING,
        },
        link: {
          type: Sequelize.DataTypes.STRING,
        },
        pages: {
          type: Sequelize.DataTypes.INTEGER,
        },
        rating: {
          type: Sequelize.DataTypes.INTEGER,
        },
        reviews: {
          type: Sequelize.DataTypes.INTEGER,
        },
        title: {
          type: Sequelize.DataTypes.STRING,
        },
        totalratings: {
          type: Sequelize.DataTypes.STRING,
        },
        createdAt: {
          allowNull: false,
          defaultValue: new Date(),
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          defaultValue: new Date(),
          type: Sequelize.DATE,
        },
      },
      {
        timestamps: true,
      }
    );
    await queryInterface.createTable(
      "comentarios",
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        id_usuario: {
          type: Sequelize.DataTypes.INTEGER,
        },
        id_livro: {
          type: Sequelize.DataTypes.INTEGER,
        },
        comentario: {
          type: Sequelize.DataTypes.STRING,
        },
        createdAt: {
          allowNull: false,
          defaultValue: new Date(),
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          defaultValue: new Date(),
          type: Sequelize.DATE,
        },
      },
      {
        timestamps: true,
      }
    );
    await queryInterface.createTable(
      "usuario",
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
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
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          defaultValue: new Date(),
          type: Sequelize.DATE,
        },
      },
      {
        timestamps: true,
      }
    );
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("usuario");
    await queryInterface.dropTable("comentarios");
    await queryInterface.dropTable("livros");

    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
