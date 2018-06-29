const express = require("express");
const router = express.Router();
//@routes GET api/posts/tests
//@desc Tests posts route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "posts Works" }));

module.exports = router;
