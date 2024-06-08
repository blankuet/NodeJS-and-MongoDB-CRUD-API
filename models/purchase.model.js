const { Schema, model } = require("mongoose");

// CREATE MODEL: Purchase
const purchaseSchema = new Schema(
  {
    shippingAddress: { type: String, required: true },
    album: { type: Schema.Types.ObjectId, ref: "Album" },

});

// REMEMBER TO EXPORT YOUR MODEL:

const Purchase = model("Purchase", purchaseSchema);

module.exports = Purchase;