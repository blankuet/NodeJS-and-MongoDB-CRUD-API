CRUD App with populate (v6)
Introduction
We have learned how to create a server using Express and how to perform CRUD actions on a MongoDB database with Mongoose. This activity will help you understand how well you have grasped these topics and how well you can apply these concepts on your own.

This challenge is about building a basic application containing two models and Express server routes.

Getting Started
You will do all the work in the files:

models/album.model.js
models/purchase.model.js
routes/albums.router.js
routes/purchases.router.js


File app.js already contains the server setup and the mongoose connection.
This file is read-only, and you are not required to write any code in it.



Task & Objectives
Reminder: Before you start writing the code, run the tests and check the test specs in the Run Output panel.
There might be some edge cases stated in the tests that might not be too obvious from the instructions.



Task 1: Create the models Album and Purchase
Important: Remember to export each model after creating it.



The Album model should have the following properties:

performer - String
title - String
cost - Number


The Purchase model should have the following properties:

shippingAddress - String
album - ObjectId referring to the Album model


Task 2: Create /albums routes
Important: Before you start working on the tasks, read the below instructions.



Requests
You can always add a console.log(req.body) or console.log(req.params) to check the content of the request body or the route parameters. The log will be visible in the Run Output section in the test results.



Responses
All your routes must return JSON response. This means that you should not use the render method on the Express response but instead, you should use res.json().

As we just explained, all routes should return an object via res.json(). The document(s) from the database should be saved in a key named data.

Example:

SomeModel.find()
  .then( (someDocuments) => res.json({ data: someDocuments }))
  .catch((err) => console.log(err));


Task 2.1: Create route POST /albums
This route will receive requests containing the object with the album information: performer, title, cost.

You can access these values through req.body.

The route POST /albums :

Should create a new album from the values received in the req.body, using the Album model.
Should returns a JSON response containing the created album document.


Task 2.2: Create route GET /albums
The route GET /albums :

Should retrieve all the albums from the database, using the Album model.
Should return a JSON response containing all album documents.


Task 2.3: Create route GET /albums/:albumId
This route receives the album id as the route parameter albumId.
You can access this value through req.params.

The route GET /albums/:albumId :

Should retrieve a single album document by its id, using the Album model.
Should return a JSON response including the retrieved album object.


Task 2.4: Create route POST /albums/:albumId
The route receives the id of the album to be updated as the route parameter albumId.

The request body will contain the album information: performer, title, cost.
You can access these values through req.body.

The route POST /albums/:albumId :

Should find an existing album by its id, and update the fields performer, title and cost.
Should return a JSON response including the updated album document.


Task 2.5: Create route POST /albums/:albumId/delete
This route receives the id of the album to be deleted as the route parameter albumId.

The route POST /albums/:albumId/delete :

Should delete an existing album by its id, using the Album model.
Should return a response including only the HTTP status code of 204.
Important: This route should return only an HTTP status. Instead of using res.json() you should use res.sendStatus().



Task 3: Create /purchases routes


Task 3.1: Create route POST /purchases
This route will receive requests containing the object with the purchase information:

shippingAddress - string,
album - object.
You can access these values through req.body (req.body.shippingAddress and req.body.album).

The route POST /purchases :

Should create a new purchase document from the values received in the req.body, using the Purchase model.
The property album should only store the _id reference of the album object.
Should returns a JSON response containing the created purchase document.


Task 3.2: Create route GET /purchases/:purchaseId
This route receives the id of the purchase document as the route parameter purchaseId.

The route GET /purchases/:purchaseId :

Should retrieve a single purchase document by its id, using the Purchase model.
Should populate the album property to get the album details.
Should return a JSON response including the populated purchase object.
Hint: The album property of the object is just a reference (id). You will have to .populate() this field to get the album document details, not just the id.



Good luck!

Your Ironhack team