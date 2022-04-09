module.exports = app => {
    const controller = require('../controllers/livrosVenda')();

    app.route('/api/v1/livros-venda').get(controller.listarLivrosVenda);
}