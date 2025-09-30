const express = require("express");
const router = express.Router();
const authCtrl = require("../controller/authcontroller");
const { authenticate, authorize } = require("../middleware/authMiddleware");

router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);
router.get("/logout", authenticate, authCtrl.logout);
module.exports = router;
