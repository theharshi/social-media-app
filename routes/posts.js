const post_controller = require("../controllers/post_controller");
const express = require("express");
const router = express.Router();
const passport = require("passport");
router.post(
  "/create-post",
  passport.checkAuthentication,
  post_controller.create_post
);
router.get(
  "/destroy/:id",
  passport.checkAuthentication,
  post_controller.destroy
);
module.exports = router;
