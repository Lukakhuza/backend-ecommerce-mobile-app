const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.createUser = (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const phoneNumber = req.body.phoneNumber;
  const address = req.body.address;
  const shopFor = req.body.shopFor;

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        phoneNumber: phoneNumber,
        address: address,
        shopFor: shopFor,
      });

      return user.save();
    })
    .then((result) => {
      console.log("Created User");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.loginUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      // If no user, redirect the user to the login page.
    }
    bcrypt
      .compare(password, user.password)
      .then((doMatch) => {
        if (doMatch) {
          // log user in
          console.log("Logged in successfully");
        }
        // else, redirect the user back to the login page.
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      console.log(users);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUser = (req, res, next) => {
  console.log("Test 12354");
  // const userId = "6825a5af70841ecb0896f31d";
  // const user =
  // User.findOne({ email:  })
  //   .then((user) => {
  //     console.log("This is the user: ", user);
  //   })
  //   // const userId = req.params.userId;
  //   // User.findById(userId)
  //   //   .then((user) => {
  //   //     console.log(user);
  //   //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

exports.getUserByEmail = (req, res, next) => {
  User.findOne({ email: req.body.email }).then((user) => {
    console.log(user);
    const result = JSON.stringify({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      phoneNumber: user.phoneNumber,
      address: user.address,
      shopFor: user.shopFor,
    });

    const userData = JSON.parse(result);
    res.status(200).json({ user: userData });
  });

  exports.updateUser = (req, res, next) => {
    console.log("Test 29", req.body);
    // User.findOne({ email: req.body.email }).then((user) => {
    //   console.log("Test 28", user);
    // });
    // const userId = "6825a5af70841ecb0896f31d";
    const userId = req.params.userId;
    const updatedFirstName = "ShmagiUpdated";
    const updatedLastName = "KhuzaurashviliUpdated";
    const updatedEmail = "Luka@test.com";
    const updatedPhoneNumber = "9083923997";
    const updatedAddress = "153 Nathan Dr., North Brunswick, NJ 08902";
    const updatedShopFor = "Men";

    console.log("User id is", req.params.userId);
    User.findById(userId)
      .then((user) => {
        user.firstName = updatedFirstName;
        user.lastName = updatedLastName;
        user.email = updatedEmail;
        user.phoneNumber = updatedPhoneNumber;
        user.address = updatedAddress;
        user.shopFor = updatedShopFor;
        return user.save();
      })
      .then((result) => {
        console.log("Updated User!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    User.findByIdAndDelete(userId)
      .then((result) => {
        console.log("Deleted User!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // User.findOne({ email: req.body.email })
  //   .then((user) => {
  //     console.log("The user is here", user.firstName);
  //     res.setHeader("Content-Type", "application/json");
  //     res.send(user.firstName);
  //     // console.log("Test Response 6", res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};
