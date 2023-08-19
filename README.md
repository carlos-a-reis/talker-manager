# Talker Manager

## Contexto

O Talker Manager é uma API REST construída com Node.js e Express com intuito de praticar os estudos das tecnologias com uma simulação de um gerenciador de informações de palestrantes (talkers).
Nesta aplicação é possível realizar as operações básicas de CRUD (Create, Read, Update e Delete), permitindo cadastrar, listar, pesquisar, editar e excluir palestrantes.

## Tecnologias Usadas

> [Node.js](https://nodejs.org/pt-br/docs) e [Express](https://expressjs.com/pt-br/)

<details>
<summary><h2>EndPoints da API</h2></summary>

 ### `GET` /talker

> Retorna todos os palestrantes:

```bash
[
  {
    "name": { talker name },
    "age": { talker age },
    "id": { id },
    "talk": {
      "watchedAt": { some date },
      "rate": { talker rate }
    }
  },
...
]
```

<hr />

### `GET` /talker/:id

> Retorna retorna o palestrante por seu "id":

```bash
{
  "name": { talker name },
  "age": { talker age },
  "id": { id },
  "talk": {
    "watchedAt": { some date },
    "rate": { talker rate }
  }
}
```

<hr />

### `GET` /talker/search

> Headers

```
Authorization: { token passado pelo EndPoint "/login" }
```

> Query Parameters

```
q: { string para pesquisa por nome do palestrante }
```

> Retorna os palestrante que o nome inclui a query "q" passada:

```bash
[
  {
    "name": { talker name },
    "age": { talker age },
    "id": { id },
    "talk": {
      "watchedAt": { some date },
      "rate": { talker rate }
    }
  },
...
]
```

<hr />

### `POST` /login

> Body

```bash
{
  "email: { e-mail no modelo "email@email.com" },
  "password": { senha de no minimo 6 caracteres }
}
```

> Retorna um token necessário para os EndPoints que requerem o Header "Authorization":

```bash
{
  "token": { token aleatorio de 16 digitos }
}
```

</details>
