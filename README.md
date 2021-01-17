# Dindo

## Hackathon Shawee CCR 2021

# Rodar todo o projeto

Para rodar o projeto completo execute `npm start` apartir da pasta raiz do projeto.

# API

A API do Dindo foi desenvolvida utilizando Nodejs, Typescript, Express e um banco de dados Postgres através do Knex.

A estrutura básica encontra-se na pasta api/src/modules, onde são encontrados os endpoints disponíveis e as regras de negócio da plataforma.

As demais pastas são arquivos core e servem como base para suporte da aplicação.

## Para rodar a api

Basta ter o docker + docker-compose instalado no computador e executar `npm run api` apartir da pasta raiz do projeto

Todo o ambiente (containers e banco de dados) será iniciado e em poucos segundos a API estará pronta para ser utilizada.

# Generating Migrations

npx knex migrate:make migration_name -x ts

# Generating Seed

npx knex seed:make migration_name -x ts
