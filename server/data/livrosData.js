const database = require("../infra/database");

exports.getLivros = function () {
  return database.query("SELECT * FROM livros limit 2000");
};

exports.saveLivros = function (livro) {
  return database.one(
    `insert into livros (author, bookformat, \"desc\", genre, img, isbn, isbn13, link, pages, rating, reviews, title, totalratings)
                                     values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) returning id`,
    [
      livro.author,
      livro.bookformat,
      livro.desc,
      livro.genre,
      livro.img,
      livro.isbn,
      livro.isbn13,
      livro.link,
      livro.pages,
      livro.rating,
      livro.reviews,
      livro.title,
      livro.totalratings,
    ]
  );
};
//Alterar
exports.atualizarLivro = function (id, post) {
  return database.none(`update livros set author = $1
                                            , bookformat = $2
                                            , \"desc"\ = $3
                                            , genre = $4
                                            , img = $5
                                            , isbn = $6
                                            , isbn13 = $7
                                            , link = $8
                                            , pages = $9
                                            , rating = $10
                                            , reviews = $11
                                            , title = $12
                                            , totalratings = $13
                                            where id = ${id}`,
                                            [
                                                post.author,
                                                post.bookformat,
                                                post.desc,
                                                post.genre,
                                                post.img,
                                                post.isbn,
                                                post.isbn13,
                                                post.link,
                                                post.pages,
                                                post.rating,
                                                post.reviews,
                                                post.title,
                                                post.totalratings,
                                              ]);
};

exports.deleteLivro = function (id) {
  return database.none(`DELETE FROM livros WHERE id = ${id}`);
};
