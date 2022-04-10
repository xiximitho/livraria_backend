const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
});

//Pegar todos livros --TIRAR O LIMIT (insomnia não suporta mais que 100mb de json.)
const getLivros = (request, response) => {
    pool.query('SELECT * FROM livros ORDER BY author ASC limit 100', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

module.exports = {
   getLivros,    
}