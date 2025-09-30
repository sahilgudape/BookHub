const express = require("express");

const auth = require("./authRoutes.js");
const book = require("./bookRoutes.js");
const admin = require("./adminRoutes.js");
const user = require("./userRoutes.js");
const category = require("./categoryRoutes.js");
const issueB = require("./issueRoutes.js");

const router = express.Router();

router.use("/auth", auth);
router.use("/book", book);
router.use("/admin", admin);
router.use("/user", user);
router.use("/category", category);
router.use("/issue", issueB);

module.exports = router;
