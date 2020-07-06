const express = require("express");
const port = 8000;
const app = express();
const expressLayout = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");

const db = require("./config/mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const flash = require("connect-flash");
const scssMiddleware = require("node-sass-middleware");
const setflashMware = require("./config/middleware");
// const { MongoStore } = require("connect-mongo");
app.use(
  scssMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);
app.use(expressLayout);
app.use(express.static("assets"));
app.use(express.urlencoded());
app.use(cookieParser());
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(
  session({
    name: "codeial",
    // TODO change the secret before deployment in production mode
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        if (err) {
          console.log("error in storing in mongo store");
        } else {
          console.log("connected to mongostore");
        }
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(setflashMware.setflash);
const route = "./routes/index";

app.use("/", require(route));

app.use('/uploads',express.static(__dirname + '/uploads'));

// app.use("/user", require(user_route));
app.set("view engine", "ejs");
app.set("views", "./views");
app.listen(port, function (err) {
  if (err) {
    console.log("error in starting the sever ");
    return;
  }
  console.log("server is up on port ", port);
});
