const User = require("../models/userModel.js");

require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// saving the sign up data in the database signUp schema
exports.signUpController = (req, res) => {
  const { username, email, password } = req.body;
  // find if the email is already taken
  User.findOne({ email: email }, (user) => {
    if (user) {
      res.status(400).send({ message: "user already exist" });
    } else {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        const user = new User({ username, email, password: hash });
        user.save((err) => {
          if (err) {
            console.log(err);
            res.status(400).send({ message: "error saving user" });
          } else {
            res.status(200).send({ message: "sucessful" });
          }
        });
      });
    }
  });
};

exports.logInController = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({ message: "please enter email and password" });
  } else {
    const user = User.findOne({ email: email }, (err, user) => {
      if (err) {
        res.status(400).send({ message: "user not found" });
        return;
      }
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (result) {
            const token = jwt.sign(
              { username: user.username, email: user.email },
              process.env.SECRET_KEY,
              // expires in 1 minute
              { expiresIn: "1s" }
            );
            res.status(200).send({
              message: "login successful",
              token: token,
            });
          } else {
            res.status(403).send({ token: null, message: "login incorrect" });
          }
        });
      } else {
        res.status(400).send({ message: "user not found" });
      }
    });
  }
};

