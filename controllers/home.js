// const home = function (req, res) {

// };
// module.exports = home;
const post = require("../model/post");
const User = require("../model/user");
module.exports.home = function (req, res) {
  post
    .find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec(function (err, posts) {
      User.find({}, function (err, users) {
        return res.render("home", {
          title: "Codeial | Home",
          posts: posts,
          all_user: users,
        });
      });
    });
};
