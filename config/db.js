const mongoose = require("mongoose");

module.exports = () => {
  return mongoose
    .connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME })
    .then(() => console.log(`connection to db established...`))
    .catch((err) => console.log(err));
};
