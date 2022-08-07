// nesse arquivos terá a configuração das rotas do projeto.
const { Router } = require('express')
const book = require('./books')
const router = Router()

router.use('/books', book)

router.get('/', async (req, res) => {
  res.send('api running!')
})

module.exports = router
