const express = require('express');
const router = express.Router();
const livrosService = require('../service/livrosService');

router.get('/livros', async function (req, res){
    const livros = await livrosService.getLivros();
    res.json(livros);
}); 
router.get('/livros/:id', async function (req, res){
    const post = req.body;
    await livrosService.atualizarLivro(req.params.id, post);
});  
router.post('/livros', async function (req, res){
    const post = req.body;
    const newLivro = await livrosService.saveLivros(post);
    res.json(newLivro);
}); 
router.put('/livros/:id', async function (req, res){
    const post = req.body;
    const updateLivro = await livrosService.atualizarLivro(req.params.id, post);
    res.json(updateLivro);
});  
router.delete('/livros/:id', async function (req, res){
    
});  

module.exports = router;