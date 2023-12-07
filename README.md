# Musings
Super minimal, non collaborative project journalling/notes taking app. The vision was to create a task manager style app for my projects where i could conveniently store thoughts and learnings from every task **along** with the task.

## Stack
The app is built in the PERN stack.  
Simple React and Chakra UI frontend, uses SWR for fetching and caching.  
Backend is a simple, flat REST API written in Express.  
Database used - Postgres, deviated from the usual M(ongoDB)ERN, because of the deeply nested nature of the data. Used Sequelize as the ORM.

## Setup
### Frontend
- ```cd musings-frontend``` and ```npm install``` the dependencies.
- ```npm start``` and view the application at [http://localhost:3000](http://localhost:3000)
### Backend
- ```cd musings-backend``` and ```npm install``` the dependencies.
- Set up a .env file following the format of .env.example. You can spin up a Postgres cloud instance for free here at [Aiven](https://aiven.io).
- ```npm run serve``` to run the server on [http://localhost:8000](http://localhost:8000)