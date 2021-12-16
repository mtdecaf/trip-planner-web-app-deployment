const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/auth");

const User = require("../models/userModel.js");

router.get("/", authorize, (req, res) => {
  // if valid token, continue
  const usernameFromToken = req.decoded.username;

  // find the user from mongodb userInfo collection using username from the token
  try {
    User.findOne({ username: usernameFromToken }, (err, user) => {
      if (err) {
        res.status(500).send({ message: "error in finding user" });
      } else {
        if (user) {
          // all the data sent to the client when the user is logged in
          res.status(200).send({ username: user.username, email: user.email });
        } else {
          res.status(404).send({ message: "user not found" });
        }
      }
    });
  } catch (err) {
    res.status(500).send({ message: "error in finding user" });
  }
});

// export as a callbable function
module.exports = router;
