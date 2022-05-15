# livraria

```sql
alter table livros
    add id serial;

create unique index livros_id_uindex
    on livros (id);

alter table livros
    add constraint livros_pk
        primary key (id);
```


npm install
npm run dev


modelo json para post e update:
```json
[
  {
    "author": "Yuan Chang-Chung",
    "bookformat": "Paperback",
    "desc": "Texto teste",
    "genre": "Philosophy,Cultural,China,Religion,Taoism,Religion",
    "img": null,
    "isbn": "61319686",
    "isbn13": 9780060000000,
    "link": "https://goodreads.com/book/show/1644091.Creativity_and_Taoism",
    "pages": 0,
    "rating": 4.56,
    "reviews": 0,
    "title": "Creativity and Taoism",
    "totalratings": 18,
    "id": 90891
  },
  {
    "author": "Aislinn Kerry",
    "bookformat": "ebook",
    "desc": "n high school, Alex, Matt, and Gavin had been an inseparable trio, but all that changed when Matt and Alex started dating, and Gavin turned his back on both of them. Now in their late twenties, Alex and Matt are still together, but years of routine have worn their relationship into a rut.",
    "genre": "Romance,M M Romance",
    "img": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1355287741l/16440930.jpg",
    "isbn": null,
    "isbn13": 9781610000000,
    "link": "https://goodreads.com/book/show/16440930-just-between-us",
    "pages": 68,
    "rating": 3.11,
    "reviews": 6,
    "title": "Just Between Us",
    "totalratings": 18,
  },
]
```

para utilizar o método post: http://localhost:3000/livros
para utilizar o método put(update): http://localhost:3000/livros/id
