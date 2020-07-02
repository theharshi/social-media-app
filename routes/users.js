const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/user");
console.log("router loaded");
router.get("/", user_controller.user);

// use passport as a middleware to authenticate
const passport = require("../config/passport-local-strategy");

router.get("/sign-up", user_controller.signUp);
router.get("/sign-in", user_controller.signIn);
router.get("/profile", passport.checkAuthentication, user_controller.profile);
router.post("/create-user", user_controller.createUser);

router.post(
    "/create-session",
    passport.authenticate("local", { failureRedirect: "/user/sign-in" }),
    user_controller.createSession
);

module.exports = router;