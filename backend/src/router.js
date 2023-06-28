const express = require("express");

const router = express.Router();

const {
  hashPassword,
  verifyPassword,
  verifyToken,
  verifyAdminRole,
  checkId,
} = require("./services/auth");

const user = require("./controllers/userControllers");

router.post("/user/login", user.authenticationCheck, verifyPassword);

router.put(
  "/adminUser/:id",
  verifyToken,
  verifyAdminRole,
  checkId,
  hashPassword,
  user.modifyUser
);

router.put("/adminUser/user/id", verifyToken, verifyAdminRole, user.modifyUser);

router.put("/user/:id", verifyToken, hashPassword, user.modifyUser);

module.exports = router;
