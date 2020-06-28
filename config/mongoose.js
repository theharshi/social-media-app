const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/codeial_development");
const db = mongoose.connection;

db.on("error", console.error.bind(console, "error in connecting to mongo db"));

db.once("open", function () {
  console.log("connected to mongo db");
});
module.exports = db;
