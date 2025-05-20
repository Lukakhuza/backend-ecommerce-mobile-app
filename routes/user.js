const express = require("express");

const usersController = require("../controllers/users");

const router = express.Router();

// Create User
router.post("/create-user", usersController.createUser);

// Get Users
router.get("/get-users", usersController.getUsers);

// Get a single user
router.get("/get-user/", usersController.getUser);

// Update an user
router.get("/update-user/:userId", usersController.updateUser);

// Delete an user
router.get("/delete-user/:userId", usersController.deleteUser);

module.exports = router;
