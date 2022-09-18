/* eslint-disable no-undef */
const livro = require('./index')

test('Autores com o nome Carolyn ', async () => {
  const result = await livro.getByAuthor('Carolyn')
  expect(result.length).toEqual(141)
})

test('Livros com a classificação acima de 4 Estrelas.', async () => {
  const result = await livro.getByRate(4)
  expect(result.length).toEqual(1000)
})

test('Livros com o genero de ficção ', async () => {
  const result = await livro.getByGenre('Fiction')
  expect(result.length).toEqual(1000)
})

test('Quantidade de livros que possuem em seu titulo a palavra Photo', async () => {
  const result = await livro.getByTitle('Photo')
  expect(result.length).toEqual(309)
})
