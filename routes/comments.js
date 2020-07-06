const comment_controlller = require("../controllers/comment_controller");
const express = require("express");
const router = express.Router();
const passport = require("passport");
router.post(
  "/create",
  passport.checkAuthentication,
  comment_controlller.create
);
router.get(
  "/destroy/:id",
  passport.checkAuthentication,
  comment_controlller.destroy
);
module.exports = router;
