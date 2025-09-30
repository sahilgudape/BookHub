const express = require("express");
const router = express.Router();
const userController = require("../controller/userController.js");
const issueCtrl = require("../controller/issueController.js");
const { authenticate } = require("../middleware/authMiddleware.js");

// User profile routes
router.get("/profile", authenticate, userController.getProfile);
router.put("/profile", authenticate, userController.updateProfile);
router.put("/password", authenticate, userController.updatePassword);
router.get("/my-books", authenticate, userController.viewMyBooks);
// Book history routes
router.get("/returned-books", authenticate, userController.viewReturnedBooks);
// userRoutes.js - Add this route
router.get("/my-issued-books", authenticate, userController.getMyIssuedBooks);
router.get("/borrow-history", userController.getBorrowHistory);
// Dashboard route
router.get("/dashboard-stats", authenticate, userController.getDashboardStats);

// Book browsing routes
router.get("/books", authenticate, userController.getAllBooks);
router.get("/books/search", authenticate, userController.searchBooks);

module.exports = router;
