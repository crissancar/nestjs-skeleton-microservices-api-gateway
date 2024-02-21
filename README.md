<div align="center">
  <a href="" target="_blank">
    <img src="https://static.skeleton-v2.dev.kubide.es/files/2023/6/1687931011473875728361.png" width="400" alt="Kubide Logo" />
  </a>
</div>

<br>

<div align="center">
<h5>API designed by Kubide Tech Builder</h5>
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
</div>


<!-- TABLE OF CONTENTS -->
## Table of Contents

* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
    * [Environment](#environment)
    * [Infrastructure](#infrastructure)
    * [Database](#database)
    * [Running the app](#running-the-app)
* [Documentation](#documentation)

<!-- GETTING STARTED -->
## Getting Started

This is an instructions on setting up the project locally.

### Prerequisites
Have **node** and **nvm** installed. Use version **18**.
```bash
$ nvm use 18.16.0
```
Install **make** (optional)
```bash
$ apt-get update
```
```bash
$ apt-get install make
```
_or_
```bash
$ apt-get install --reinstall make
```

### Installation

1. Clone repository
```bash
$ git clone git@gitlab.com:kubide-crew/skeleton/skeleton-api.git
```
2. Install dependencies
```bash
$ make deps
```
_or_
```bash
$ npm install
```

### Environment
Create an `.env` file with these variables in the root directory
```
ENV_KEY
NODE_ENV

KUBIDE_logger_level

KUBIDE_api_port
KUBIDE_api_url

KUBIDE_cdn_port
KUBIDE_cdn_url

KUBIDE_api_documentation_enabled
KUBIDE_api_documentation_redoc
KUBIDE_api_documentation_url

KUBIDE_client_signature
KUBIDE_client_publicKey

KUBIDE_typeorm_logging
KUBIDE_typeorm_seeds_name
KUBIDE_typeorm_seeds_email
KUBIDE_typeorm_seeds_password
KUBIDE_typeorm_seeds_userAudiences
KUBIDE_typeorm_seeds_adminUserAudience

KUBIDE_sentry_enabled
KUBIDE_sentry_debug
KUBIDE_sentry_blankList
KUBIDE_sentry_dsn

KUBIDE_sendgrid_enabled
KUBIDE_sendgrid_apiKey
KUBIDE_sendgrid_fromEmail

KUBIDE_postgres_database_name
KUBIDE_postgres_database_host
KUBIDE_postgres_database_port
KUBIDE_postgres_database_username
KUBIDE_postgres_database_password

KUBIDE_jwt_secret
KUBIDE_jwt_access_expiresIn
KUBIDE_jwt_refresh_expiresIn

KUBIDE_bcrypt_salt
KUBIDE_bcrypt_pepper

KUBIDE_crypto_algorithm
KUBIDE_crypto_iv
KUBIDE_crypto_key
KUBIDE_crypto_cipher_input_encoding
KUBIDE_crypto_cipher_output_encoding
KUBIDE_crypto_decipher_input_encoding
KUBIDE_crypto_decipher_output_encoding
```

### Infrastructure

```bash
$ make start_infrastructure
```
_or_
```bash
$ npm run docker:env
```

### Database

1. Connect to postrgres with `pgAdmin` through the URL `http://localhost:5050` or your `IDE` and create the databases with names `skeleton-api` and `skeleton-api-test`
2. Run migrations
```bash
$ make migrations
```
_or_
```bash
$ npm run typeorm:migration:run
```
3. Run seeds
```bash
$ make seeds
```
_or_
```bash
$ npm run typeorm:seed:run
```

### Running the app
```bash
$ make start
```
_or_
```bash
$ npm run start:dev
```

<!-- DOCUMENTATION -->
## Documentation
-  [Kubide Wiki](https://wiki.dev.kubide.es/en/projects/skeletons)
-  [NestJS](https://docs.nestjs.com/)

