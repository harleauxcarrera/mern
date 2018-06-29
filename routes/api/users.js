const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar"); //for loading avatar image
const bcrypt = require("bcryptjs");
//@routes GET api/user/tests
//@desc Tests user route
//@access Public
router.get("/testme", (req, res) => res.json({ msg: "Users Page Works" }));

//@routes GET api/user/register
//@desc Register user
//@access Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
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
module.exports = router;
