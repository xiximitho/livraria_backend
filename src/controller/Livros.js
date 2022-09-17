const model = require("../models");
const { Op } = require("sequelize");
class Livros {
  async store(DAO) {
    try {
      const books = await model.sequelize.models.Livros.create({
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
        totalratings: DAO.totalratings,
      });
      return books;
    } catch (error) {
      throw new Error(error);
    }
  }

  async show() {
    try {
      const books = await model.sequelize.models.Livros.findAll({
        limit: 1000,
        order: [["isbn", "ASC"]],
      });
      return books;
    } catch (error) {
      throw new Error(error);
    }
  }

  async showId(isbn) {
    try {
      const books = await model.sequelize.models.Livros.findOne({
        where: {
          isbn,
        },
      });
      return books;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getByTitle(title) {
    try {
      const books = await model.sequelize.models.Livros.findOne({
        where: {
          title: {
            [Op.like]: `%${title}%`,
          },
        },
        order: [["isbn", "ASC"]],
        limit: 1000,
      });
      return books;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getByAuthor(author) {
    try {
      const books = await model.sequelize.models.Livros.findAll({
        order: [["isbn", "ASC"]],
        limit: 1000,
        where: {
          
          author: {
            [Op.like]: `%${author}%`,
          },
        },
      });
      return await books;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getByGenre(genre) {
    try {
      const books = await model.sequelize.models.Livros.findAll({
        limit: 1000,
        order: [["isbn", "ASC"]],
        where: {
          genre: {
            [Op.like]: `%${genre}%`,
          },
        },
        
      });
      return await books;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getByRate(rate) {
    try {
      const books = await model.sequelize.models.Livros.findAll({
        limit: 1000,
        order: [["isbn", "ASC"]],
        where: {
          rating: {
            [Op.gte]: [Number(rate)],
          },
        },
      });
      return await books;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = Livros;
