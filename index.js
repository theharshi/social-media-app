const express = require("express");
const port = 8000;
const app = express();
const expressLayout = require("express-ejs-layouts");

const db = require("./config/mongoose");

app.use(expressLayout);
app.use(express.static("assets"));

const route = "./routes/index";
app.use("/", require(route));
app.set("view engine", "ejs");
app.set("views", "./views");
app.listen(port, function (err) {
  if (err) {
    console.log("error in starting the sever ");
    return;
  }
  console.log("server is up on port ", port);
});
