const Post = require("../model/post");
const Comment = require("../model/comment");
module.exports.create_post = function (req, res) {
  Post.create(
    {
      content: req.body.content,
      user: req.user._id,
    },
    function (err, post) {
      if (err) {
        console.log("error in creating a post");
        return;
      }
      req.flash("success", "post added");
      return res.redirect("back");
    }
  );
};
module.exports.destroy = function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    if (post.user == req.user.id) {
      post.remove();
      Comment.deleteMany({ post: req.params.id }, function (err) {
        req.flash("success", "post removed");
        return res.redirect("/");
      });
    } else {
      return res.redirect("back");
    }
  });
};
