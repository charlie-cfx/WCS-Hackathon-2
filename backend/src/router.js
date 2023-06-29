const express = require("express");

const router = express.Router();

const {
  hashPassword,
  verifyPassword,
  verifyToken,
  verifyAdminRole,
  checkId,
} = require("./services/auth");

// const accessory = require("./controllers/accessoryControllers");
// const brand = require("./controllers/brandControllers");
// const color = require("./controllers/colorControllers");
// const faq = require("./controllers/faqControllers");
// const models = require("./controllers/modelController");
// const os = require("./controllers/osControllers");
// const osVersion = require("./controllers/os_versionControllers");
// const phone = require("./controllers/phoneControllers");
// const state = require("./controllers/stateControllers");
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
router.get("/users/:id", verifyToken, checkId, user.read);
router.put("/users/:id", verifyToken, hashPassword, user.modifyUser);
// router.get("/accessory", verifyToken, accessory.browse);
// router.get("/brand", verifyToken, brand.browse);
// router.get("/color", verifyToken, color.browse);
// router.get("/faq", verifyToken, faq.browse);
// router.get("/models", verifyToken, models.browse);
// router.get("/os", verifyToken, os.browse);
// router.get("/os_version", verifyToken, osVersion.browse);
// router.get("/phones", verifyToken, phone.filterPhone);
// router.get("/state", verifyToken, state.browse);

module.exports = router;
