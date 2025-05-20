const http = require("http");
require("dotenv").config({ path: "credentials.env" });

const express = require("express");
const mongoose = require("mongoose");

const app = express();

const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");

app.use("/", (req, res, next) => {
  const result = {
    firstName: "Luka",
    lastName: "Khuza",
  };
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(result));
  next();
});

// console.log(typeof adminRoutes);

app.use("/product", productRoutes);
app.use("/user", userRoutes);
// const server = http.createServer(app);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster1.7tujvnn.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?w=majority&appName=Cluster1`
  )
  .then((result) => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log(err);
  });
