# DEVolunteer

Connecting Developers and Non-Profits

### The Big Idea

**As a developer**, you can reach out to non-profit organizations (NPO's) that are looking for the perfect dev to build their app or website.

**As a non-profit organization**, you can post the project(s) you need tackled, and reach out to developers who are interested in working with you.

### Making Requests Using HTTPie

##### User Routes

- Example POST request to /api/signup (create a new User)
  - ```http POST /api/signup username='user' password='secret' email='user@users.com'```
  - Expected output: a unique User token
- Example GET request to /api/signup (fetch a specific User)
  - ```http GET /api/signin username='user' password='secret'```
  - Expected output: a specific User object

##### Dev Routes

- Example GET request to /api/devlist (fetch all Devs) !!!!!!!NOT WORKING!!!!!!!
  - ```http GET /api/devlist```
  - Expected output: an array of existing Devs
- Example GET request to /api/dev/:id (fetch a specific Dev) !!!!!NOT WORKING!!!!!!
  - ```http GET /api/dev/<some ID>```
  - Expected output: a specific Dev object
- Example DELETE request to /api/dev/:id
  - ```http DELETE /api/dev/<some ID>```
  - Expected output: none


Developed by: Carlo Santos (JS), Christopher Closser (JS), James Thomas (JS), Kaylee Alvarado (JS), Robert Hatfield (iOS), and Jay Balderas (iOS)

Project adapted from: JR Iriarte, Jacob Isenberg, Michael Bishop, and Jonathan Daniel
