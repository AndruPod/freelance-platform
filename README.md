# GraphQL API - freelancePlatform


> This project is a **freelance platform** that connects clients and freelancers.  
> Clients can post offers, and freelancers can apply to them.  
> The **Admin Panel** provides management tools for users, roles, and categories.
>
> **GraphQL** allows complex data retrieval and efficient querying from the server with a single request.
---

## You can try this API by yourself

- [About](#-about)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Running the App](#-running-the-app)
- [Project Structure](#-project-structure)
- [GraphQL Schema Example](#-graphql-schema)
- [Example Queries](#-example-queries)
- [Author](#-author)

## 🧩 About

The **Freelance Platform API** provides backend functionality for a system where:

- 👤 **Clients** can create and manage job offers
- 💼 **Freelancers** can browse and apply to offers
- 🛠️ **Admins** can manage users, roles, and categories

The backend is built with **Node.js** and **GraphQL**, enabling flexible data fetching and type-safe schema evolution.  
It uses **JWT authentication** for secure access and **PostgreSQL** (via **Sequelize**) for relational data management.


## 🧰 Architecture

- **Runtime environment** - Node.js
- **GraphQL server** — Apollo Server
- **Database** — PostgreSQL
- **ORM** — Sequelize
- **Authentication** — JWT
- **Validation** — Zod / Joi
- **Logging** — Winston / Pino

## ⚙️ Installation

```bash
git clone https://github.com/AndruPod/freelance-platform.git
cd server
npm install
```

## ▶️ Running the app

```bash
# Development mode
npm run dev

# Production mode
npm start
```

Once started, the API will be available at:
http://localhost:5000/graphql

## 📁 Project Structure

```bash
server/
├── index.js            # Entry point
│
├── models/             # Sequelize models (User, Offer, etc.)
├── schemas/            # GraphQL type definitions
├── resolvers/          # GraphQL resolvers
├── services/           # Business logic layer (DB queries, domain logic)
│
├── error/              # Custom error classe and global error handler
├── middlewares/        # Error handling and logging middlewares
├── utils/              # Helpers and auth utilities
│
├── examples/           # Example GraphQL queries and mutations
│
└── .env                # Environment variables
```

## 🧬 GraphQL Schema

```graphql
type User {
    id: ID!
    username: String!
    password: String!
    role: String!
    offers: [Offer!]!
    userOffers: [UserOffer!]!
}

input UserInput {
    username: String!
    password: String!
    role: String
}

input CheckAuthInput {
    id: ID!
    username: String!
    role: String!
}

type Token {
    token: String!
}

input UpdateUserInput {
    id: ID!
    role: String!
}

type Query {
    getAllUsers: [User]
    getUserById(id: ID!): User
    getUsersByRole(role: String!): [User]
    checkAuth: Token!
}

type Mutation {
    login(input: UserInput!): Token!
    register(input: UserInput!): Token!
    updateRole(input: UpdateUserInput!): Boolean!
    deleteUser(id: ID!): Boolean!
}
```

## 🧠 GraphQL Example Queries

You can test these queries in:

- GraphQL Playground (`http://localhost:5000/graphql`)
- Apollo Sandbox
- Insomnia / Postman

## 🛠️ Usage

Run your API and copy a query from `/examples/queries/` or `/examples/mutations/` into your GraphQL client.

## 🔍 Example Queries

### 📖 Get all users

```graphql
query getAllUsers {
    getAllUsers {
        id
        username
        password
        role
        offers
        userOffers
    }
}
```

### ✍️ Sign up

```graphql
mutation register {
    register(input: {
        username: admin
        password: 12345678
        role: "ADMIN" # If you do not put role by default it is client
    }) {
        token
    }
}
```

## 👤 Author

**AndruPod** — Node.js Backend Developer