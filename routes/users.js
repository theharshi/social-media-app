const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/user");
console.log("router loaded");
router.get("/", user_controller.user);

router.get("/sign-up", user_controller.signUp);
router.get("/sign-in", user_controller.signIn);

router.post("/create-user", user_controller.createUser);

module.exports = router;