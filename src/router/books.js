const { Router } = require('express')
const BookController = require('../controller/Books')
const bookController = new BookController()

const router = Router()

router.get('/', async (req, res) => {
  try {
    const result = await bookController.show()
    res.status(200).send(result)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/', async (req, res) => {
  try {
    const result = await bookController.store(req.body)
    res.status(200).send(result)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router
