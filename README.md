# 📝 Todo List - Backend

Este é o backend de uma aplicação **Todo List** desenvolvida com **Node.js**, **TypeScript**, e utilizando **Swagger** para documentação da API. A aplicação segue os princípios de uma API RESTful e permite realizar operações CRUD (Criar, Ler, Atualizar, Excluir) em tarefas.

A aplicação é containerizada com **Docker** e **Docker Compose** para facilitar o desenvolvimento e o deploy.

---

## 🐳 Como rodar com Docker e Docker Compose

Siga os passos abaixo para rodar a aplicação dentro de contêineres Docker:

### 1. Clone o repositório

```bash
git clone https://github.com/caioalvess/todo-list-nerus-challenge-api.git
cd todo-list-nerus-challenge-api
```

### 1. Construir e rodar os contêineres

```bash
docker-compose up --build
```

Isso irá construir a imagem do Docker para o backend e iniciar os contêineres necessários, incluindo o banco de dados, se configurado no `docker-compose.yml`.

### 2. Acessar a aplicação

A aplicação ficará disponível em:

- Backend API: [http://localhost:3001](http://localhost:3001)
- Swagger UI (documentação da API): [http://localhost:3001/api-docs](http://localhost:3001/api-docs)
