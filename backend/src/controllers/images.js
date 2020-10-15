const express = require("express");
const Image = require("../models/image");
const { cloudinary } = require("../utils/cloudinary");

const router = express.Router({ mergeParams: true });

// Post a product in a specific user - without asnwers
router.post("/", async (req, res) => {
  const { body } = req;
  const fileStr = body.data;
  try {
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "dev-test",
    });
    console.log(uploadResponse);
    uploadImageToDb(uploadResponse);
    return res.status(201).json({
      message: "post success",
    });
  } catch (err) {
    console.log("Something went wrong!");
  }
});

const uploadImageToDb = async (uploadResponse) => {
  if (uploadResponse) {
    const image = new Image.Image({
      imageUrl: uploadResponse.url,
      public_id: uploadResponse.public_id,
    });
    const result = await image.save();
    console.log(result);
    return;
  }
};

module.exports = router;
