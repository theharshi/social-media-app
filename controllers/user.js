const User = require("../model/user");

module.exports.user = function(req, res) {
    return res.end("<h1>INSIDE USER CONTROLLER</h1>");
};

module.exports.signUp = function(req, res) {
    return res.render("signUp");
};

module.exports.signIn = function(req, res) {
    return res.render("signIn");
};
module.exports.profile = function(req, res) {
    return res.render("user_profile");
};

// controller for sign up
module.exports.createUser = function(req, res) {
    if (req.body.password != req.body.confirm_password) {
        res.redirect("back");
        return;
    }
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) {
            console.log("error in finding the email in signing up", err);
            return;
        }
        if (!user) {
            User.create(req.body, function(err, user) {
                if (err) {
                    console.log("error in creating new user ");
                    return;
                }
                console.log("inside creating ");
                return res.redirect("/user/sign-in");
            });
        } else {
            return res.redirect("back");
        }
    });
};

// controller for sign in
module.exports.createSession = function(req, res) {
    res.redirect("/user/profile");
};