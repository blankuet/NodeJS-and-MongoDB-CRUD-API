const express = require('express');
const router = express.Router();
const Album = require("./../models/album.model");

// CREATE ROUTES
// POST /albums
// ...


// GET /albums
// ...


// GET /albums/:albumId
// ...


// POST /albums/:albumId
// ...


// POST /albums/:albumId/delete
// ...

// CREATE ROUTES


// GET /albums
router.get("/albums", (req, res) => {
    Album.find()
    .then( (albums) => res.json({ data: albums }))
    .catch((err) => console.log(err));
  });

// POST /albums
router.post("/albums", (req, res) => {
  const { performer, title, cost } = req.body;
  console.log(req.body)
  // Creating a new album instance
    const newAlbum = new Album({
        performer,
        title,
        cost
    });
  // Saving new album to db
    newAlbum.save(req.body)
    .then( (albums) => res.json({ data: albums }))
    .catch((err) => console.log(err));
  });
  

// GET /albums/:albumId
router.get('/albums/:albumId', (req, res) => {
    const { albumId } = req.params;
    Album.findById(albumId)
        .then((album) => res.json({ data: album }))
        .catch((err) => console.log(err));
});


// POST /albums/:albumId
router.post('/albums/:albumId', (req, res) => {
    const { albumId } = req.params;
    const { performer, title, cost } = req.body;

    Album.findByIdAndUpdate(albumId, { performer, title, cost }, { new: true, runValidators: true })
        .then((album) => res.json({ data: album }))
        .catch((err) => console.log(err));
});


// POST /albums/:albumId/delete
router.post('/albums/:albumId/delete', (req, res) => {
    const { albumId } = req.params;

    Album.findByIdAndDelete(albumId)
        .then(album => {res.sendStatus(204);
        })
        .catch(err => {
            console.error(err);
           
        });
});


module.exports = router;