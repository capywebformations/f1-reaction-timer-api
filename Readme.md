# F1 Reaction Timer API

## Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Dependencies](#dependencies)
- [Setup and Installation](#setup-and-installation)
- [Running the Project](#running-the-project)
- [Dependency List](#dependency-list)

## Project Overview

The F1 Reaction Timer API is a Node.js-based API designed for managing user accounts and recording reaction times in an F1-style reaction timer application. The API includes user authentication, reaction time recording, and API documentation using Swagger.

## Architecture

The project is structured as follows:

- **api/**: Contains the main application code, including controllers, middlewares, models, routes, and services.
- **.github/**: Contains GitHub Actions workflows for CI/CD.
- **Dockerfile.dev**: Dockerfile for development environment.
- **Dockerfile.prod**: Dockerfile for production environment.
- **compose.yml**: Docker Compose file for development.
- **compose copy.yml**: Docker Compose file for production.

## Dependencies

To run this project, you need to have the following dependencies installed:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Setup and Installation

1/ **Clone the repository:**

````sh
git clone https://github.com/yourusername/f1-reaction-timer-api.git
````

````sh
cd f1-reaction-timer-api
````

2/ **Install dependencies:**

````sh
make install
````

3/ **Set up environment variables:**

Copy the .env.sample file to .env.

````sh
cp .env.sample .env
````

Fill in the required values:

- PORT: server port
- MONGO_URI: url to connect to mongodb database
- JWT: jwt secret to salt the jwt method

## Running the Project

### Development

````sh
make up
````

This will start the API server on <http://localhost:3000> and the MongoDB server on mongodb://localhost:27017.

The api documentation is accessible on <http://localhost:3000/api-docs>

### Production

````sh
docker compose -f compose.prod.yml up --build -d
````

This will start the API server on specified uri in compose.prod.yml and the MongoDB server on mongodb://localhost:27017.
No devDependencies in this mode.

## Dependency List

### Docker images

- node:20.17-slim
- mongo:7.0.14

### NPM Packages

### Production Dependencies

- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc)
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)

#### Development Dependencies

- [@eslint/js](https://www.npmjs.com/package/@eslint/js)
- [@types/bcrypt](https://www.npmjs.com/package/@types/bcrypt)
- [@types/express](https://www.npmjs.com/package/@types/express)
- [@types/jest](https://www.npmjs.com/package/@types/jest)
- [@types/jsonwebtoken](https://www.npmjs.com/package/@types/jsonwebtoken)
- [@types/mongoose](https://www.npmjs.com/package/@types/mongoose)
- [@types/node](https://www.npmjs.com/package/@types/node)
- [@types/supertest](https://www.npmjs.com/package/@types/supertest)
- [@types/swagger-jsdoc](https://www.npmjs.com/package/@types/swagger-jsdoc)
- [@types/swagger-ui-express](https://www.npmjs.com/package/@types/swagger-ui-express)
- [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)
- [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser)
- [eslint](https://www.npmjs.com/package/eslint)
- [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier)
- [globals](https://www.npmjs.com/package/globals)
- [jest](https://www.npmjs.com/package/jest)
- [prettier](https://www.npmjs.com/package/prettier)
- [supertest](https://www.npmjs.com/package/supertest)
- [ts-jest](https://www.npmjs.com/package/ts-jest)
- [ts-node](https://www.npmjs.com/package/ts-node)
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)
- [typescript](https://www.npmjs.com/package/typescript)
- [typescript-eslint](https://www.npmjs.com/package/typescript-eslint)
