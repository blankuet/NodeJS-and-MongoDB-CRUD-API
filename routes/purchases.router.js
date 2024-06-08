const express = require('express');
const router = express.Router();
const Purchase = require("./../models/purchase.model");
const Album = require("./../models/album.model");


// CREATE ROUTES
// POST /purchases
// ...


// GET /purchases/:purchaseId - you will use .populate() here
// ...


// CREATE ROUTES
// POST /purchases
router.post('/purchases', (req, res) => {
    const { shippingAddress, album } = req.body;

    // Creating a new purchase instance
    const newPurchase = new Purchase({
        shippingAddress,
        album: album._id // Storing only the album ID reference
    });

    // Saving the new purchase to the db
    newPurchase.save()
        .then(purchase => res.json({ data: purchase }))
        .catch(err => {
            console.error(err);
        });
});


// GET /purchases/:purchaseId - you will use .populate() here
router.get('/purchases/:purchaseId', (req, res) => {
    const { purchaseId } = req.params;

    Purchase.findById(purchaseId)
        .populate('album') // Populate the album ref to get album details
        .then(purchase => {res.json({ data: purchase });
        })
        .catch(err => {
            console.error(err);
        });
});


module.exports = router;