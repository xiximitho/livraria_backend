const rate = require('./index')

test('Autores com o nome Carolyn ', async () => {
  const result = await rate.getByAuthor('Carolyn')
  expect(result.length).toEqual(141)
})

test('Livros com a classificação acima de 4 Estrelas, há um limit 30 na consulta.', async () => {
  const result = await rate.getByRate(4)
  expect(result.length).toEqual(30)
})
