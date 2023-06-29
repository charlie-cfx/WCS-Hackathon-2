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
const phone = require("./controllers/phoneControllers");

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

router.get("/phones", phone.filterPhone);
// router.get("/phones", phone.filterPhone);

module.exports = router;
