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

router.put(
  "/adminUser/:id",
  verifyToken,
  verifyAdminRole,
  checkId,
  hashPassword,
  user.modifyUser
);

router.get("/user", verifyToken, user.browse);
router.get("/user/:id", verifyToken, user.read);
router.put(
  "/adminUser/user/:id",
  verifyToken,
  verifyAdminRole,
  user.modifyUser
);
router.put("/user/:id", verifyToken, hashPassword, checkId, user.modifyUser);
router.post("/user/login", user.authenticationCheck, verifyPassword);
router.delete(
  "/adminUser/user/:id",
  verifyToken,
  verifyAdminRole,
  user.destroyUser
);

router.get("/accessories", verifyToken, accessory.browse);
router.post("/accessory", verifyToken, accessory.add);
router.delete("/accssory/:id", verifyToken, accessory.destroy);

router.get("/brands", verifyToken, brand.browse);
router.post("/brand", verifyToken, brand.add);
router.delete("/brand/:id", verifyToken, brand.destroy);

router.get("/colors", verifyToken, color.browse);
router.post("/color", verifyToken, color.add);
router.delete("/color/:id", verifyToken, color.destroy);

router.get("/faq", verifyToken, faq.browse);
router.post("/faq", verifyToken, faq.add);
router.delete("/faq/:id", verifyToken, faq.destroy);

router.get("/models", verifyToken, models.browse);
router.post("/models", verifyToken, models.add);
router.delete("/models/:id", verifyToken, accessory.destroy);

router.get("/os", verifyToken, os.browse);
router.post("/os", verifyToken, os.add);
router.delete("/os/:id", verifyToken, os.destroy);

router.get("/os_version", verifyToken, osVersion.browse);
router.post("/os_version", verifyToken, osVersion.add);
router.delete("/os_version/:id", verifyToken, osVersion.destroy);

router.get("/phones", verifyToken, phone.filterPhone);
// router.post("/phones", verifyToken, phone.add);
router.delete("/phone/:id", verifyToken, phone.destroy);

router.get("/states", verifyToken, state.browse);
router.post("/state", verifyToken, state.add);
router.put("/state/:id", verifyToken, state.edit);
router.delete("/state/:id", verifyToken, state.destroy);

module.exports = router;
