const express = require("express");
const router = express.Router();

const upload = require("../middleware/fileMiddleware.js");
const bookCtrl = require("../controller/bookController.js");

router.post("/books", upload.single("image"), bookCtrl.createBook);
router.get("/books", bookCtrl.getAllBooks);
router.put("/books/:id", upload.single("image"), bookCtrl.updateBook);
router.delete("/books/:id", bookCtrl.deleteBook);
router.get("/books/name/:name", bookCtrl.getBookByName);
router.get("/books/:id", bookCtrl.getBookById);

module.exports = router;
