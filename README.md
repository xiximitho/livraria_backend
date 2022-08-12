# Livraria API

---

Este projeto consiste em criar uma simples API para retornar livros armazenados através do arquivo  :

```bash
populate/livros.csv
```

## Tecnologias utilizadas:

```js
    "eslint": "^8.21.0",
    "express": "^4.18.1",
    "nodemon": "^2.0.19",
    "pg": "^8.7.3",
    "pg-hstore": "^2.3.4",
    "sequelize": "^6.21.3"
```

### Rotas para serem utilizadas:

```http
http://localhost:3000/books/
http://localhost:3000/books/?id
http://localhost:3000/books/author/?autor
http://localhost:3000/books/title/?titulo
```

### Preparando o ambiente de desenvolvimento.

- Necessário utilizar o docker e docker-compose
  
  ```bash
  docker-compose up
  ```

após isso, o banco utilizando o postgres será iniciado.

- Execute o script de instalação das dependencias do projeto e inicialize as migrações:
  
  ```bash
  yarn
  yarn run sequelize-cli db:migrate
  ```

- Após isso, importe na tabela Livros dentro do banco, o arquivo :
  
  ```bash
  populate/livros.csv
  ```

- Então rode o programa utilizando:
  
  ```bash
  yarn run start
  ```


