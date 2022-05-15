//Conversa entre a camada de serviço e a camada de acesso a dados
const livrosData = require('../data/livrosData');

exports.getLivros = function () {
    return livrosData.getLivros();
}

exports.saveLivros = function (livro) {
    return livrosData.saveLivros(livro);
}

exports.deleteLivro = function (id) {
    return livrosData.deleteLivro(id);
}

exports.atualizarLivro = function(id, post){
    return livrosData.atualizarLivro(id, post);
}