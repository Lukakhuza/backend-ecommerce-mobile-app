const crypto = require("crypto");
const User = require("../models/user");

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      //   redirect to the reset page
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          // Flash a message with error key that no account with that email was found.
          // redirect to /reset
        }
        user.token = token;
      })
      .catch();
  });
};

exports.postLogin = (req, res, next) => {
  // res.setHeader("Set-Cookie", "loggedIn=true");
  // req.isLoggedIn = true;
  req.session.isLoggedIn = true;
  console.log("Hello there");
  // res.redirect("/");
};
