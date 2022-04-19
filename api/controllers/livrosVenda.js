const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
});

exports.post = (req, res, next) => {
  //Pool.
};

exports.get = (req, res, next) => {
 
  pool.query('SELECT * FROM livros ORDER BY author ASC limit 2000', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

exports.put = (req, res, next) => {
  //let id = req.params.id;
};

exports.delete = (req, res, next) => {
  //let id = req.params.id;
};