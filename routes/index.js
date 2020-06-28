const express = require("express");
const router = express.Router();
const home_controller = require("../controllers/home");
const user_controller = require("../controllers/user");
console.log("router loaded");
router.get("/", home_controller.home);
router.get("/user", user_controller.user);

module.exports = router;
