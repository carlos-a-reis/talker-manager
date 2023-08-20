# Talker Manager

## 📑 Contexto

O Talker Manager é uma API REST construída com Node.js e Express, com o intuito de praticar os estudos dessas tecnologias por meio da simulação de um gerenciador de informações de palestrantes (talkers).
Nesta aplicação, é possível realizar as operações básicas de CRUD (Create, Read, Update e Delete), permitindo cadastrar, listar, pesquisar, editar e excluir palestrantes.

## 💻 Tecnologias Usadas

> [Node.js](https://nodejs.org/pt-br/docs)

> [Express](https://expressjs.com/pt-br/)

<details>
<summary><h2>📌 EndPoints da API</h2></summary>

 ### `GET` /talker

> Retorna todos os palestrantes

> Retorno

```javascript
Status: 200
```

```json
[
  {
    "name": "{ nome do palestrante }",
    "age": "{ idade do palestrante }",
    "id": "{ id do palestrante }",
    "talk": {
      "watchedAt": "{ data da palestra no padrão dd/mm/aaaa }",
      "rate": "{ nota do palestrante }"
    }
  },
  {}
]
```

<hr />

### `GET` /talker/:id

> Retorna o palestrante com o "id" passado como parâmetro

> Retorno

```javascript
Status: 200
```

```json
{
  "name": "{ nome do palestrante }",
  "age": "{ idade do palestrante }",
  "id": "{ id do palestrante }",
  "talk": {
    "watchedAt": "{ data da palestra no padrão dd/mm/aaaa }",
    "rate": "{ nota do palestrante }"
  }
}
```

<hr />

### `GET` /talker/search

> Retorna os palestrantes cujos nomes incluem a query "q" passada

> Headers

```
Authorization: { token retornado pelo EndPoint "/login" }
```

> Query Parameters

```
q: { string usada para pesquisar por nome do palestrante }
```

> Retorno

```javascript
Status: 200
```

```json
[
  {
    "name": "{ nome do palestrante }",
    "age": "{ idade do palestrante }",
    "id": "{ id do palestrante }",
    "talk": {
      "watchedAt": "{ data da palestra no padrão dd/mm/aaaa }",
      "rate": "{ nota do palestrante }"
    }
  },
  {}
]
```

<hr />

### `POST` /login

> Cria o token que é necessário para os EndPoints que recebem o Header "Authorization"

> Body

```json
{
  "email": "{ e-mail no padrão 'email@email.com' }",
  "password": "{ senha com no mínimo 6 caracteres }"
}
```

> Retorno

```javascript
Status: 200
```

```json
{
  "token": "{ token aleatorio de 16 digitos }"
}
```

<hr />

### `POST` /talker

> Cria um novo palestrante

> Headers:

```
Authorization: { token retornado pelo EndPoint "/login" }
```

> Body:

```json
{
  "name": "{ nome do palestrante }",
  "age": "{ idade do palestrante }",
  "talk": {
    "watchedAt": "{ data da palestra no padrão dd/mm/aaaa }",
    "rate": "{ nota do palestrante }"
  }
}
```

> Retorno

```javascript
Status: 201
```

```json
{
  "name": "{ nome do palestrante }",
  "age": "{ idade do palestrante }",
  "id": "{ id do palestrante }",
  "talk": {
    "watchedAt": "{ data da palestra no padrão dd/mm/aaaa }",
    "rate": "{ nota do palestrante }"
  }
}
```

<hr />

### `PUT` /talker/:id

> Atualiza o palestrante com o "id" passado como parâmetro

> Headers:

```
Authorization: { token retornado pelo EndPoint "/login" }
```

> Body:

```json
{
  "name": "{ nome do palestrante }",
  "age": "{ idade do palestrante }",
  "talk": {
    "watchedAt": "{ data da palestra no padrão dd/mm/aaaa }",
    "rate": "{ nota do palestrante }"
  }
}
```

> Retorno

```javascript
Status: 200
```

```json
{
  "name": "{ nome do palestrante }",
  "age": "{ idade do palestrante }",
  "id": "{ id do palestrante }",
  "talk": {
    "watchedAt": "{ data da palestra no padrão dd/mm/aaaa }",
    "rate": "{ nota do palestrante }"
  }
}
```

<hr />

### `DELETE` /talker/:id

> Exclui o palestrante com o "id" passado como parâmetro

> Headers:

```
Authorization: { token retornado pelo EndPoint "/login" }
```

> Retorno

```javascript
Status: 204 (No Content)
```

</details>

## ⌨️ Executando o Projeto

- Clone o repositório

  ```bash
  git clone git@github.com:carlos-a-reis/talker-manager.git
  ```

- Entre na pasta do repositório

  ```bash
  cd talker-manager/
  ```
  
<details>
<summary><h3>🖥️ Executando Localmente</h3></summary>

- Instale as dependências

  ```bash
  npm install
  ```
  
- Inicie a aplicação

  ```bash
  npm start
  ```

- A partir daqui, já é possível realizar as requisições aos EndPoints

</details>

<details>
<summary><h3>🐳 Executando Com Docker</h3></summary>

- Rode o serviço `node` para iniciar o container `talker-manager`

  ```bash
  docker compose up -d
  ```

- Acesse o terminal interativo do container que está rodando em segundo plano

  ```bash
  docker exec -it talker-manager bash
  ```

- Instale as dependências

  ```bash
  npm install
  ```
  
- Inicie a aplicação

  ```bash
  npm start
  ```

- A partir daqui, já é possível realizar as requisições aos EndPoints

</details>

<details>
<summary><h3>👨‍💻 Executando o Projeto em Modo Desenvolvedor</h3></summary>
 
> É possível executar o projeto em modo desenvolvedor, tanto localmente quanto com [Docker](https://www.docker.com/get-started/), utilizando o [Nodemon](https://nodemon.io) para monitorar as mudanças nos arquivos e reiniciar automaticamente o servidor

- Para fazer isso, em vez de usar `npm start`, utilize:

  ```bash
  npm run dev
  ```
