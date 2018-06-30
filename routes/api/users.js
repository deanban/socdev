const express = require("express");
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const router = express.Router();

//@route    GET api/users/test
//@desc     tests user route
//@access   private for users
router.get("/test", (req, res) =>
  res.json({
    msg: "users works"
  })
);

//@route    GET api/users/test
//@desc     tests user route
//@access   private for users
router.post("/register", (req, res) => {
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({ email: "email exists" });
    } else {
      //grab an avatar with the email provided
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "r", //rating
        d: "mm" //default
      });

      //create new user
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar, //user avatar obj
        password: req.body.password
      });

      //encrypt password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route    GET api/users/test
//@desc     tests user route
//@access   private for users
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "user not found" });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // res.json({ msg: "success" });

        //if the user is a match...

        //payload for jwt sign
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };

        //jwt.sign() to get a token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 7200 }, //2hrs
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ password: "password incorrect" });
      }
    });
  });
});

//@route    GET api/users/current
//@desc     treturn current user
//@access   private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // res.json({ msg: "success" });
    // res.json(req.user);
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
