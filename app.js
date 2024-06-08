const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const app = express();
const MONGODB_URI = 'mongodb://localhost:27017/node-crud';

mongoose.connect(MONGODB_URI)
  .then(()=> console.log('connected to the database'))
  .catch((err)=> console.log('There was an error', err));


app.use(bodyParser.json());


// ROUTES
const albumsRouter = require('./routes/albums.router');
app.use('/', albumsRouter);

const purchaseRouter = require('./routes/purchases.router');
app.use('/', purchaseRouter);


// 404 route
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" })
});

module.exports = app;