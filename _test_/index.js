const BookController = require('../src/controller/Livros')
const bookController = new BookController()

function getByAuthor (valor) {
  return bookController.getByAuthor(valor)
}

function getByRate (valor) {
  return bookController.getByRate(valor)
}

function getByTitle (title) {
  return bookController.getByTitle(title)
}

function getByGenre (genre) {
  return bookController.getByGenre(genre)
}

module.exports = { getByAuthor, getByRate, getByTitle, getByGenre }
