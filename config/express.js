const express    = require('express');
const bodyParser = require('body-parser');
const config     = require('config');

module.exports = () => {
    const app = express();

    require('../api/routes/livrosVenda')(app);

    //Seta as variaveis do app
    app.set('port', process.env.PORT || config.get('server.port'));

    //middlewares
    app.use(bodyParser.json());

    return app;
};