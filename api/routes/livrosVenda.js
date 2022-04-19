const express = require('express');
const router = express.Router();
const controller = require('../controllers/livrosVenda');

router.get('/get', controller.get);
router.post('/post', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);module.exports = router;

module.exports = router;