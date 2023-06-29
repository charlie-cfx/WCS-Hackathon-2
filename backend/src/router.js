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
const models = require("./controllers/modelControllers");
const brand = require("./controllers/brandControllers");
const state = require("./controllers/stateControllers");
const color = require("./controllers/colorControllers");

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
router.get("/phones", verifyToken, phone.filterPhone);
router.get("/models", verifyToken, models.browse);
router.get("/brand", verifyToken, brand.browse);
router.get("/state", verifyToken, state.browse);
router.get("/color", verifyToken, color.browse);

module.exports = router;
