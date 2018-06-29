const express = require("express");
const router = express.Router();
//@routes GET api/user/tests
//@desc Tests user route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "users Works" }));

module.exports = router;
