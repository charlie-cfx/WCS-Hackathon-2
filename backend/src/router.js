const express = require("express");

const router = express.Router();

const {
  hashPassword,
  verifyPassword,
  verifyToken,
  verifyAdminRole,
  checkId,
} = require("./services/auth");

const accessory = require("./controllers/accessoryControllers");
const brand = require("./controllers/brandControllers");
const color = require("./controllers/colorControllers");
const faq = require("./controllers/faqControllers");
const models = require("./controllers/modelController");
const os = require("./controllers/osControllers");
const osVersion = require("./controllers/os_versionControllers");
const phone = require("./controllers/phoneControllers");
const state = require("./controllers/stateControllers");
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
router.get("/accessories", verifyToken, accessory.browse);
router.get("/brands", verifyToken, brand.browse);
router.get("/colors", verifyToken, color.browse);
router.get("/faq", verifyToken, faq.browse);
router.get("/models", verifyToken, models.browse);
router.get("/os", verifyToken, os.browse);
router.get("/os_versions", verifyToken, osVersion.browse);
router.get("/states", verifyToken, state.browse);
router.get("/phones", verifyToken, phone.filterPhone);

module.exports = router;
