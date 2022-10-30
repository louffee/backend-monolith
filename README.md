# Louffee Backend 🧠

The Louffee Backend is a monolith which provides the API for the Louffee App. It is written in TypeScript and uses the ExpressJS framework.

This is the monolith for the backend which brains up Louffee! 🧠

## Getting Started

1.  To contribute to Louffee, you will have to clone:

    ```bash
    git clone git@github.com:louffee/louffee-backend.git
    ```

2.  Install the dependencies:

    ```bash
    yarn install
    ```

3.  Create a `.env` file in the root directory and add the following environment variables:

    ```bash
    cp .env.example .env
    ```

4.  Deploy `docker-compose.yml`:

    ```bash
    docker-compose up -d
    ```

5.  Run the migrations:

    ```bash
    yarn run database:migrate
    ```

6.  Start the server:

    ```bash
    yarn run start
    ```

### Prerequisites

- [NodeJS](https://nodejs.org) >=18.12.0
- [Yarn](https://yarnpkg.com) >=1.22.15
