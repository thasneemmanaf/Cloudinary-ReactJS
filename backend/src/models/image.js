const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  public_id: { type: String, required: true },
});

module.exports = {
  Image: mongoose.model("Image", ImageSchema),
  ImageSchema,
};
