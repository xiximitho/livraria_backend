const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
});

exports.post = (req, res, next) => {
  //Pool.
};

exports.get = (req, res, next) => {
  pool.query(
    "SELECT * FROM livros where not img is null and img <> '' and not isbn is null and isbn <> '' and not title is null and title <> '' \
    and not link is null and link <> '' and not rating is null and rating > 0 order by isbn limit 100",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

exports.getByIsbn = (req, res, next) => {
  const { isbn } = req.params;
  pool.query(
    "SELECT * FROM livros where isbn like '" + isbn + "%'",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

exports.getByAuthor = (req, res, next) => {
  const { author } = req.params;
  console.log(author)
  pool.query(
    "SELECT * FROM livros where author like '%" + author + "%'",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

exports.delete = (req, res, next) => {
  //let id = req.params.id;
};
