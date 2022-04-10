const express    = require('express');
const bodyParser = require('body-parser');
const config     = require('config');
const db         = require('./livros')

module.exports = () => {
    const app = express();

    //Seta as variaveis do app
    app.set('port', process.env.PORT || config.get('server.port'));

    //middlewares
    app.use(bodyParser.urlencoded({
        extended: true,
    }));

    app.get('/', (request, response) => {
        response.json({ info: 'Teste' })
      })

    app.get('/livros', db.getLivros)
    //get por author /livros/:author.getLivrosByAuthor
    //post
    //put
    //delete
    return app;
};