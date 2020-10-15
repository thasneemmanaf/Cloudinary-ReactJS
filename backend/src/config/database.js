const mongoose = require("mongoose");
// eslint-disable-next-line import/no-unresolved
require("dotenv").config();

const connect = () => {
  const mongoConnectionString = process.env.MONGO_URI;
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose.connect(mongoConnectionString, opts);
  // eslint-disable-next-line no-console
  console.log("DB connected");
};
module.exports = { connect };
