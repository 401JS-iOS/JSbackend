[![Build Status](https://travis-ci.org/401JS-iOS/JSbackend.svg?branch=master)](https://travis-ci.org/401JS-iOS/JSbackend)

# DEVolunteer

Connecting Developers and Non-Profits for the Greater Good

### The Big Idea

**As a developer**, you can reach out to non-profit organizations (NPO's) that are looking for the perfect dev to build their app or website. If you've already collaborated with a specific NPO, you have the option to review your overall experience.

**As a non-profit organization**, you can post the project(s) you need tackled, and reach out to developers who are interested in working with you. You can also review your experience(s) with specific Developers you've worked with.

### Specs

- Full-stack application with an iOS front-end, and RESTful JS API as a back-end.
- Utilizes MongoDB and Mongoose.js to store User information.
- Utilizes Mocha and Chai for testing.

### Usage

- Fork and clone this repository, and run ```npm install``` in your terminal to install all required dependencies.
- Create a file called '.env' at the root level of the project directory. In the file, specify PORT and MONGODB_URI variables:
   ```
  PORT=3000
  MONGODB_URI=mongodb://localhost/devolunteer
  ```
- Create a directory called 'db' at the root level of the project directory. This is where Mongo will store all of its necessary files.
- At the root level of the project directory, start the Mongo server by running ```mongod --dbpath ./db```.
- In a second terminal window, run ```npm run start```. Your server should start up on the port specified in your .env file.

### Making Requests

We recommend using Postman to make requests to our API. Below are a list of available routes, their  what a successful request to each route is expected to return.

##### User Routes

- POST request to ```/api/signup```
  - Should create a new User, save it in the database, and generate a unique User token
  - Expected output and status code: the new User object and a unique User token // 200
- GET request to ```/api/signin```
  - Should fetch a specific User from the database and generate a unique User token
  - Expected output and status code: a specific User object and a unique User token // 200

##### Developer Routes

- POST request to ```/api/dev```
  - Should create a new Developer and save it to the database
  - Expected output and status code: the new Developer object // 200
- GET request to ```/api/dev/:id```
  - Should fetch a specific Developer from the database
  - Expected output and status code: a specific Developer object // 200
- GET request to ```/api/devlist```
  - Should fetch all Developers from the database
  - Expected output and status code: an array of Developer objects // 200
- PUT request to ```api/dev/:id```
  - Should update properties of an existing Developer
  - Expected output and status code: the updated Developer object // 200
- DELETE request to ```/api/dev/:id```
  - Should delete a specific Developer from the database
  - Expected output and status code: none // 204

##### NPO Routes

- POST request to ```/api/npo```
  - Should create a new NPO and save it to the database
  - Expected output and status code: the new NPO object // 200
- GET request to ```/api/npo/:id```
  - Should fetch a specific NPO from the database
  - Expected output and status code: a specific NPO object // 200
- GET request to ```/api/npolist```
  - Should fetch all NPO's from the database
  - Expected output and status code: an array of NPO objects // 200
- PUT request to ```/api/npo/:id```
  - Should update properties of an existing NPO
  - Expected output and status code: the updated NPO object // 200
- DELETE request to ```/api/npo/:id```
  - Should delete a specific NPO from the database
  - Expected output and status code: none // 204

#### Project Routes

- POST request to ```/api/npo/:id/project```
  - Should create a new Project and save it to the database
  - Expected output and status code: the new Project object // 200
- GET request to ```/api/npo/:id/project/:id```
  - Should fetch a specific Project from the database
  - Expected output and status code: a specific Project object // 200
- GET request to ```/api/projectlist```
  - Should fetch all Projects from the database
  - Expected output and status code: an array of Project objects // 200
- PUT request to ```/api/npo/:id/project/:id```
  - Should update properties of an existing Project
  - Expected output and status code: the updated Project object // 200
- DELETE request to ```/api/npo/:id/project/:id```
  - Should delete a specific Project from the database
  - Expected output and status code: none // 204


#### Review Routes

- POST request to ```/api/npo/:id/project/:id/review```
  - Should create a new Review for a specific Project and save it to the database
  - Expected output and status code: the new Review object // 200
- GET request to ```api/npo/:id/project/:id/review/:id```
  - Should fetch a specific Review for a specific Project from the database
  - Expected output and status code: a specific Review object // 200
- GET request to ```/api/project/:id/reviewlist```
  - Should fetch all Reviews for a specific Project from the database
  - Expected output and status code: an array of Review objects for a specific Project // 200
- PUT request to ```api/npo/:id/project/:id/review/:id```
  - Should update properties of an existing Review for a specific Project
  - Expected output and status code: the updated Review object // 200
- DELETE request to ```/api/npo/:id/project/:id/review/:id```
  - Should delete a specific Review for a specific Project from the database
  - Expected output and status code: none // 204

Developed by Code Fellows students: Carlo Santos (JS), Christopher Closser (JS), James Thomas (JS), Kaylee Alvarado (JS), Robert Hatfield (iOS), and Jay Balderas (iOS)

Project adapted from Code Fellows students: JR Iriarte, Jacob Isenberg, Michael Bishop, and Jonathan Daniel
