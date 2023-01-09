# typescript-rest-api-auth-roles

This project implements a **REST API** with **token authentication** and **user/group based authorization**.

***

## Front-end

The front-end for this project was developed using the react-admin package, and can be found at: [https://github.com/sfeitosa/typescript-react-admin-auth-roles](https://github.com/sfeitosa/typescript-react-admin-auth-roles).

*** 

## Starting the project

To start this project you have to follow some steps.

First, we need to create the migrations to generate the database script.

> yarn migration:generate

Then, we need to run the migrations to create the database schema. 

> yarn migration:run

In this project, we are using `sqlite3` as the database, for simplicity. Since we are using TypeORM, you can change the SGBD easily, if necessary. 

After this, the last step is to seed the database with information about the existent routes, which are used by the *authorization* mechanism. 

> yarn seed

Then, you can start the development server:

> yarn dev
