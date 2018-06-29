const express = require("express");
const app = express();
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const bodyParser = require("body-parser");

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//dbconfig
const db = require("./config/keys").mongoURI;

//initial Route
app.get("/", (req, res) => res.send("hello"));

//connect to mondoDB
mongoose
  .connect(
    "mongodb://harleauxcarrera:please313@ds121301.mlab.com:21301/mernudemycourse"
  )
  .then(() => console.log("Mongo Connected"))
  .catch(err => console.log(err));

//routes//
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//run the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running @ port: ${port}`));
