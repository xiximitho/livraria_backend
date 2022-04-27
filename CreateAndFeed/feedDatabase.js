pool = require("../config/db");
const fs = require("fs");
const Pool = require("pg").Pool;
const fastcsv = require("fast-csv");

let stream = fs.createReadStream("GoodReads_100k_books.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function (data) {
    csvData.push(data);
  })
  .on("end", function () {
    // remove the first line: header
    csvData.shift();

    const query =
      'INSERT INTO livros  \
      select $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13 \
      where not exists (select 1 from livros where img =$5 and "desc" = $3 and link =$8 ) ';
    pool.connect((err, client, done) => {
      if (err) throw err;
      try {
        csvData.forEach((row) => {
          client.query(query, row, (err, res) => {
            if (err) {
              //console.log(err.stack);
            }
          });
        });
      } finally {
        done();
      }
    });
  });
stream.pipe(csvStream);
