const express = require("express");
const router = express.Router();

const adminCtrl = require("../controller/adminController.js");
const catCtrl = require("../controller/categoryController.js");
const { authenticate, authorize } = require("../middleware/authMiddleware.js");

router.get("/users", authenticate, authorize("admin"), adminCtrl.getAllUser);
router.get(
  "/users/:id",
  authenticate,
  authorize("admin"),
  adminCtrl.getUserById
);
router.put(
  "/users/:id",
  authenticate,
  authorize("admin"),
  adminCtrl.updateUser
);
router.delete(
  "/users/:id",
  authenticate,
  authorize("admin"),
  adminCtrl.deleteUser
);

router.post(
  "/categories",
  authenticate,
  authorize("admin"),
  catCtrl.createCategory
);

router.get("/categories", catCtrl.getAllCategory);
router.put(
  "/categories/:id",
  authenticate,
  authorize("admin"),
  catCtrl.updateCategory
);

router.delete(
  "/categories/:id",
  authenticate,
  authorize("admin"),
  catCtrl.deleteCategory
);

module.exports = router;
