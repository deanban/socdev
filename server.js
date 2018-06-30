const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);

//DB config
const db = require("./config/keys").mongoURI;

//DB connect
mongoose
  .connect(db)
  .then(() => console.log("mongodb connection success"))
  .catch(error => console.log(error));

app.get("/", (req, res) => res.send("hello world!"));

//use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is on ${port}`));
