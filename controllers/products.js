const Product = require("../models/product");
const User = require("../models/user");

exports.createProduct = (req, res, next) => {
  const title = "Title 5";
  const price = 35.99;
  const description = "This is the description";
  const imageUrl = "image URL 15";
  const category = "Men's Clothing";
  const product = new Product({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
    category: category,
  });
  product
    .save()
    .then((result) => {
      console.log("Created Product");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      console.log(products);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = "682592a9540cff409b8f9397";
  Product.findById(prodId)
    .then((product) => {
      console.log(product);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateProduct = (req, res, next) => {
  const prodId = req.params.productId;
  const updatedTitle = "Title 1 Updated";
  const updatedPrice = 26.0;
  const updatedDescription = "This is some description Updated";
  const updatedImageUrl = "image URL 1 Updated";
  const updatedCategory = "Men's Updated";

  Product.findById(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDescription;
      product.imageUrl = updatedImageUrl;
      product.category = updatedCategory;
      return product.save();
    })
    .then((result) => {
      console.log("Product Updated");
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByIdAndDelete(prodId)
    .then((result) => {
      console.log("Product Deleted");
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCart = (req, res, next) => {
  const product = req.body.productData;
  console.log("Test 42", product);
  // req.user.addProductToCart(product);
  // const prodId = req.body.productId;
  // Find product by id
  // after finding the product, return req.user.addProductToCart(product)
};
