const http = require("http");
require("dotenv").config({ path: "credentials.env" });
const bodyParser = require("body-parser");

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster1.7tujvnn.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?w=majority&appName=Cluster1`;

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.use(bodyParser.json({ strict: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

app.use("/", (req, res, next) => {
  // const result = {
  //   firstName: "Luka",
  //   lastName: "Khuza",
  // };
  // res.setHeader("Content-Type", "application/json");
  // res.setHeader("Set-Cookie", "loggedIn=true");
  req.session.isLoggedIn = true;
  // res.send(JSON.stringify(result));
  next();
});

app.use("/product", productRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
// const server = http.createServer(app);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log(err);
  });
