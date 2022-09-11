const BookController = require('../src/controller/Livros')
const bookController = new BookController()

function getByAuthor (valor) {
  return bookController.getByAuthor(valor)
}

function getByRate (valor) {
  return bookController.getByRate(valor)
}

module.exports = { getByAuthor, getByRate }
