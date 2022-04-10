Criação da tabela para utilizar o .csv

```sql
create table if not exists livros
(
    author       text,
    bookformat   text,
    "desc"       text,
    genre        text,
    img          text,
    isbn         text,
    isbn13       numeric,
    link         text,
    pages        integer,
    rating       numeric,
    reviews      integer,
    title        text,
    totalratings integer
);
```


./api -> Código da api
./api/controllers -> controladores
./api/data -> contem os mocks
./api/routes -> rotas da api

