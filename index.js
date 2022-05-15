const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/', require('./server/route/livrosRota'));

app.listen(3000, () => { 
  console.log('Express is listening on port 3000!');
})