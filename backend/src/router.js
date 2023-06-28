const express = require("express");

const router = express.Router();

const {
  hashPassword,
  verifyPassword,
  verifyToken,
  verifyAdminRole,
} = require("./services/auth");

const user = require("./controllers/userControllers");

router.post("/user/login", user.authenticationCheck, verifyPassword);

router.put("/users/:id", hashPassword, user.modifyUser);

module.exports = router;
