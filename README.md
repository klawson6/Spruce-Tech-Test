# Tic-Tac-Toe

Full-stack Tic-Tac-Toe application with a 3-15 square grid game board and game history tracking.

## Tech Stack

- **Frontend:** React, TypeScript, TailwindCSS
- **Backend:** Node.js, Fastify, Prisma
- **Database:** PostgreSQL
- **Infrastructure:** Docker

## Prerequisites

Ensure you have the following installed on your machine:

- [Docker](https://docs.docker.com/engine/install/)
- [Docker Buildx](https://github.com/docker/buildx)
- [Node.js 24 LTS](https://nodejs.org/)

## Quick Start (Docker)

The easiest way to build and run the entire application (database, backend, and frontend) is using Docker.

1.  **Start the Application**
    Run the following command in the root directory. This will build the Docker images and start the services in detached mode.

    ```bash
    npm start
    ```

2.  **Play the Game**
    Once the containers are running, open your browser and navigate to:
    [http://localhost:8080](http://localhost:8080)

## Management Commands

The root `package.json` includes several helper scripts for managing the application:

- **Stop the application:**

  ```bash
  npm run stop
  ```

  _(Stops the running containers)_

- **Tear down (clean up):**

  ```bash
  npm run down
  ```

  _(Stops containers and removes volumes, wiping the database)_

- **Start only the database:**
  ```bash
  npm run start:db
  ```
  _(Useful for local development if you want to run the app code outside of Docker)_

## Local Development

If you are developing, or if you prefer to run the client and server locally outside of Docker:

1.  **Install Dependencies**
    ```bash
    npm install
    ```
2.  **Start the Database**
    ```bash
    npm run start:db
    ```
3.  **Run the Server** (in a new terminal)
    ```bash
    cd server
    npm start
    ```
4.  **Run the Client** (in a new terminal)
    ```bash
    cd client
    npm start
    ```
    The client will be available at [http://localhost:3001](http://localhost:3001), and the server at [http://localhost:8080](http://localhost:8080).
