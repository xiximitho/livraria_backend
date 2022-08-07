const model = require('../models')
const { Op } = require('sequelize')
class Books {
  async store (DAO) {
    try {
      const books = await model.sequelize.models.Books.create({
        author: DAO.author,
        bookformat: DAO.bookformat,
        desc: DAO.desc,
        genre: DAO.genre,
        img: DAO.img,
        isbn: DAO.isbn,
        isbn13: DAO.isbn13,
        link: DAO.link,
        pages: DAO.pages,
        rating: DAO.rating,
        reviews: DAO.reviews,
        title: DAO.title,
        totalratings: DAO.totalratings
      })
      return books
    } catch (error) {
      throw new Error(error)
    }
  }

  async show () {
    try {
      const books = await model.sequelize.models.Books.findAll()
      return books
    } catch (error) {
      throw new Error(error)
    }
  }

  async showId (id) {
    try {
      const books = await model.sequelize.models.Books.findOne({
        where: {
          id
        }
      })
      return books
    } catch (error) {
      throw new Error(error)
    }
  }

  async getByTitle (title) {
    try {
      const books = await model.sequelize.models.Books.findOne({
        where: {
          title
        }
      })
      return books
    } catch (error) {
      throw new Error(error)
    }
  }

  async getByAuthor (author) {
    try {
      const books = await model.sequelize.models.Books.findAll({
        where: {
          author: {
            [Op.like]: `%${author}%`
          }
        }
      })
      return await books
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = Books
