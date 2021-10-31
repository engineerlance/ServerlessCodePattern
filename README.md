# Serverless Design Pattern Demo 

This project is a demo of how to write production ready code using TypeScript and the serverless framework in a serverless web app context. It is a simple movie database, with API endpoints to perform CRUD operations on a movie entity stored in DynamoDB modelled generically to support further entities using **single table design**.

## Table of Contents

- [Serverless Design Pattern Demo](#serverless-design-pattern-demo)
  - [Table of Contents](#table-of-contents)
  - [Pre-requisites](#pre-requisites)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)

## Pre-requisites

- In order to be able to deploy this project, make sure to have the AWS CLI configured with a given profile to use.
- Public API key from [the movie db](https://developers.themoviedb.org/3/getting-started/introduction), replace the env variable with its value in serverless.yml

## Usage

To deploy this project, run the following commands in the terminal:

```bash
npm i
sls deploy
```

To package and compile this project with **esbuild**:

```bash
sls package
```


## API Endpoints 

- **APIURL/stage/mov**: 
  - Method: POST 
  - Payload sample:
  ```json 
  "MovTitle": "NewFilm", 
  "MovYear": 2012,
  "MovLang":"en", 
  "MovCountry": "USA", 
  "MovGenre": ["Thriller", "Action"],
  "MovDirector": "DirectorName",
  "MovProdCompanies": [{"name": "Universal", "country": "USA"}]  
  ```
- **APIURL/dev/mov/{MovTitle}**: 
  - Method: GET 
  - APIURL/dev/mov/get/NewFilm
- **APIURL/dev/mov/{MovTitle}**: 
  - Method: DELETE 
 