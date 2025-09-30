const express = require("express");
const router = express.Router();

const catCtrl = require("../controller/categoryController.js");

router.post("/categories", catCtrl.createCategory);
router.get("/categories", catCtrl.getAllCategory);
router.put("/categories/:id", catCtrl.updateCategory);
router.delete("/categories/:id", catCtrl.deleteCategory);
router.get("/categories/:id", catCtrl.getCategoryById);

module.exports = router;
