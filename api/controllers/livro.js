const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
});

exports.getAll = (req, res) => {
    pool.query(
      "SELECT * FROM livros where genre is not null and img is not null order by rating desc limit 100 ",
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json(results.rows);
      }
    );
  };

exports.getByTitulo = (req, res) => {
  const titulo = req.params.livro;
  console.log(titulo)
  pool.query(
    "SELECT * FROM livros where title like '%"+titulo+"%' and genre is not null and img is not null limit 100 ",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

exports.getByGenre = (req, res) => {
    const genero = req.params.genre;
    console.log(genero)
    pool.query(
      "SELECT * FROM livros where genre like '%"+genero+"%' and genre is not null and img is not null and title is not null order by title desc limit 100",
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json(results.rows);
      }
    );
  };

  exports.getByRate = (req, res) => {
    const rate = req.params.rate;
    console.log(rate)
    pool.query(
      "SELECT * FROM livros where rating > "+rate+ " and genre is not null and img is not null and title is not null order by title desc limit 30",
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json(results.rows);
      }
    );
  };