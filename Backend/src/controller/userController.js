const userModel = require("../models/userModel.js");
const issueModel = require("../models/issueModel.js");

exports.getProfile = (req, res) => {
  const userId = req.user.user_id;

  userModel
    .getUserById(userId)
    .then((result) => {
      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = result[0];
      delete user.password;
      return res.status(200).json({ data: user });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Failed to fetch user profile", error: err.message });
    });
};

exports.updateProfile = (req, res) => {
  const userId = req.user.user_id;
  const { user_name, user_email } = req.body;

  // Validation
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const namePattern = /^[a-zA-Z ]+$/;

  if (!user_name || !user_email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  if (user_name.length < 3 || user_name.length > 100) {
    return res.status(400).json({ message: "Name must be 3-100 characters" });
  }

  if (!namePattern.test(user_name)) {
    return res.status(400).json({ message: "Invalid name format" });
  }

  if (!emailPattern.test(user_email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Check if email is already taken by another user
  userModel
    .getUserByEmail(user_email)
    .then((result) => {
      if (result.length > 0 && result[0].user_id !== userId) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Update profile
      userModel
        .updateUserProfile(user_name, user_email, userId)
        .then((updateResult) => {
          if (updateResult.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
          }

          return res
            .status(200)
            .json({ message: "Profile updated successfully" });
        })
        .catch((err) => {
          return res
            .status(500)
            .json({ message: "Failed to update profile", error: err.message });
        });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Failed to update profile", error: err.message });
    });
};

exports.updatePassword = (req, res) => {
  const userId = req.user.user_id;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "Current password and new password are required" });
  }

  if (newPassword.length < 6) {
    return res
      .status(400)
      .json({ message: "New password must be at least 6 characters long" });
  }
  userModel
    .getUserById(userId)
    .then((result) => {
      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = result[0];

      if (currentPassword !== user.password) {
        return res
          .status(400)
          .json({ message: "Current password is incorrect" });
      }

      // Update password
      userModel
        .updatePassword(newPassword, userId)
        .then((updateResult) => {
          if (updateResult.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
          }

          return res
            .status(200)
            .json({ message: "Password updated successfully" });
        })
        .catch((err) => {
          return res
            .status(500)
            .json({ message: "Failed to update password", error: err.message });
        });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Failed to update password", error: err.message });
    });
};

exports.viewReturnedBooks = (req, res) => {
  const userId = req.user.user_id;

  userModel
    .viewReturnedBooks(userId)
    .then((result) => {
      if (result.length === 0) {
        return res.status(404).json({ message: "No returned books found" });
      }

      return res.status(200).json({ data: result });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Failed to fetch returned books",
        error: err.message,
      });
    });
};

exports.viewIssuedBooks = (req, res) => {
  const userId = req.user.user_id;

  userModel
    .viewIssuedBooks(userId)
    .then((result) => {
      if (result.length === 0) {
        return res.status(404).json({ message: "No issued books found" });
      }

      return res.status(200).json({ data: result });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Failed to fetch issued books", error: err.message });
    });
};

exports.getDashboardStats = (req, res) => {
  const userId = req.user.user_id;

  userModel
    .getDashboardStats(userId)
    .then((result) => {
      return res.status(200).json({ data: result[0] });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Failed to fetch dashboard stats",
        error: err.message,
      });
    });
};

exports.getAllBooks = (req, res) => {
  userModel
    .getAllBooks()
    .then((result) => {
      if (result.length === 0) {
        return res.status(404).json({ message: "No books available" });
      }

      return res.status(200).json({ data: result });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Failed to fetch books", error: err.message });
    });
};

exports.searchBooks = (req, res) => {
  const searchTerm = req.query.q;

  if (!searchTerm) {
    return res.status(400).json({ message: "Search term is required" });
  }

  userModel
    .searchBooks(searchTerm)
    .then((result) => {
      if (result.length === 0) {
        return res
          .status(404)
          .json({ message: "No books found matching your search" });
      }

      return res.status(200).json({ data: result });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Failed to search books", error: err.message });
    });
};

exports.getMyIssuedBooks = (req, res) => {
  const userId = req.user.id;

  issueModel
    .getIssuedBooks(userId)
    .then((result) => {
      return res.status(200).json({
        success: true,
        data: result || [],
      });
    })
    .catch((err) => {
      console.error("Error fetching issued books:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to load issued books",
      });
    });
};

exports.getBorrowHistory = async (req, res) => {
  try {
    const userId = req.user?.id; // Comes from middleware
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }

    const history = await userModel.getBorrowHistory(userId);
    res.json(history); // Send back borrowed history
  } catch (err) {
    console.error("Error fetching borrow history:", err);
    res.status(500).json({ message: "Failed to fetch borrow history" });
  }
};

exports.viewMyBooks = (req, res) => {
  const userId = req.user.user_id || req.user.id;

  // Test query - get all books to see if connection works
  userModel
    .getAllBooks()
    .then((books) => {
      console.log("All books test:", books.length);
      res.json({
        success: true,
        data: books.slice(0, 3), // Return first 3 books as test
        message: "Test data - showing first 3 books",
      });
    })
    .catch((error) => {
      console.error("Test error:", error);
      res.status(500).json({
        success: false,
        message: "Test failed",
      });
    });
};
