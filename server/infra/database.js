//Configurações do banco.
const pgp = require('pg-promise')();
const db = pgp({
    database: 'postgres',
    port: 5432,
    host: 'localhost',
    user: 'postgres',
    password: 'postgres'
});

module.exports = db