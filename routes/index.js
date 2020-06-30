const express = require("express");
const router = express.Router();

const home_controller = require("../controllers/home");
router.get("/", home_controller.home);
router.use("/user", require("./users"));

console.log("router loaded");

module.exports = router;
