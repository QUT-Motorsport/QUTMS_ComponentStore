# QUTMS_ComponentStore

## Component Store
This is the repository for the ComponentStore, a web-based app used to track the quantity of components in the workshop as well as manage the components in either the book or drawers. The purpose of the app is to help team be more organised.

The project's frontend is built on NextJS, the backend is built on NodeJS and the Database is built with MongoDB. The project is deployed in a Docker-compose container.

## Install dependencies
```bash
npm install
```
## Run the project 
```bash
npm run dev
```
or 
```bash
npm run start
```
## Docker Deployment
Docker and Docker-compose are used to deploy ComponentStore. Download Docker Desktop (windows & mac) or on linux Docker and Docker-compose.

```shell
docker-compose up --build
```

The docker-compose.yml file is setup to build the backend container locally and pull the frontend from the dockerhub. Be sure to include the build command or it won't work.