pool = require ('../../config/db')

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

exports.getByAuthor = ( req, res, next) => {
  const { author } = req.params;
  pool.query("SELECT * FROM livros where author like '" + author + "%'", (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

exports.delete = (req, res, next) => {
  //let id = req.params.id;
};