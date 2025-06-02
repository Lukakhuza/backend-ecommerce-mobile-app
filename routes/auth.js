const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login-with-session", authController.postLogin);

module.exports = router;
