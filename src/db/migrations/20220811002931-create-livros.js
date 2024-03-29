'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Livros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      author: {
        type: Sequelize.STRING
      },
      bookformat: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.STRING
      },
      genre: {
        type: Sequelize.STRING
      },
      img: {
        type: Sequelize.STRING
      },
      isbn: {
        type: Sequelize.STRING
      },
      isbn13: {
        type: Sequelize.BIGINT
      },
      link: {
        type: Sequelize.STRING
      },
      pages: {
        type: Sequelize.BIGINT
      },
      rating: {
        type: Sequelize.BIGINT
      },
      reviews: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      totalratings: {
        type: Sequelize.BIGINT
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Livros')
  }
}
