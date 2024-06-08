const { Schema, model } = require("mongoose");

// CREATE MODEL: Album
const albumSchema = new Schema(
  {
    performer: { type: String, required: true },
    title: { type: String, required: true },
    cost: { type: Number, required: true }

});

// REMEMBER TO EXPORT YOUR MODEL:

const Album = model("Album", albumSchema);

module.exports = Album;