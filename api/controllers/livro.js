const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
});


exports.getByTitulo = (req, res) => {
  const titulo = req.params.livro;
  console.log(titulo)
  pool.query(
    "SELECT * FROM livros where title like '%"+titulo+"%'",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

