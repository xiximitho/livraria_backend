module.exports = () => {
    const livrosVendaDB = require ('../data/livrosVenda.json');
    const controller = {};

    controller.listarLivrosVenda = (req, res) => res.status(200).json(livrosVendaDB)

    return controller;
}