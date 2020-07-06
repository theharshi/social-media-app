const User = require("../model/user");

module.exports.user = function (req, res) {
  return res.end("<h1>INSIDE USER CONTROLLER</h1>");
};

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }
  return res.render("signUp");
};

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  } else {
    return res.render("signIn");
  }
};
module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    return res.render("user_profile", {
      profile_user: user,
    });
  });
};

// controller for sign up
module.exports.createUser = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    req.flash("error", "password did'nt match");
    res.redirect("back");
    return;
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding the email in signing up", err);
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in creating new user ");
          return;
        }
        console.log("inside creating ");
        req.flash("success", "successfully signed up");
        return res.redirect("/user/sign-in");
      });
    } else {
      req.flash("error", "user already exist try another email");
      return res.redirect("back");
    }
  });
};

// controller for sign in
module.exports.createSession = function (req, res) {
  //redirecting to home
  req.flash("success", "logged in");
  res.redirect("/");
};

module.exports.destroysession = function (req, res) {
  req.logout();
  req.flash("success", "logged out");
  res.redirect("/");
};

const multer = require('multer');

module.exports.update = function (req, res) {
  if (req.user.id == req.params.id) {
    User.findById(req.params.id, function (err, user) {
      if(err){
        console.log('error in finding the user');
      }
      console.log('********');
      User.uploadedAvatar(req,res,function(err){
        console.log('********');
        if(err){
          console.log('*****multer error*****',err);
        }
          console.log(req.file);
          
          
          user.name = req.body.name;
          user.email = req.body.email;
          if(req.file){
            user.avatar = User.avatarPath + '/' + req.file.filename;
            console.log(user.avatar);
          }
          user.save();
          return res.redirect("back");
        
      });
     
    });
  } else {
    return res.status(401).send("Unauthorized");
  }
};
