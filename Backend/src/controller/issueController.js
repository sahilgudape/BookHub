const issueModel = require("../models/issueModel");

exports.issueBook = (req, res) => {
  const { book_id, user_id } = req.body;
  const issue_date = new Date();

  issueModel
    .issueBook({ book_id, user_id, issue_date })
    .then((result) => {
      return res.status(201).json({ message: "Book issued successfully" });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Failed to issue book", error: err.toString() });
    });
};

// Return a book
exports.returnBook = (req, res) => {
  const { issue_id } = req.params;
  const return_date = new Date();

  issueModel
    .returnBook({ issue_id, return_date })
    .then((result) => {
      return res
        .status(200)
        .json({ message: "Book returned successfully", data: result });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Failed to return book", error: err.toString() });
    });
};

// Get issued books for a user
exports.getIssuedBooks = (req, res) => {
  const { user_id } = req.params;

  issueModel
    .getIssuedBooks(user_id)
    .then((result) => {
      if (!result || result.length === 0) {
        return res.status(404).json({ message: "No issued books found" });
      }
      return res.status(200).json({ data: result });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Failed to fetch issued books",
        error: err.toString(),
      });
    });
};

exports.getPendingFines = (req, res) => {
  const { user_id } = req.params;

  issueModel
    .getPendingFines(user_id)
    .then((result) => {
      if (!result || result.length === 0) {
        return res.status(404).json({ message: "No pending fines found" });
      }
      return res.status(200).json({ data: result });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Failed to fetch pending fines",
        error: err.toString(),
      });
    });
};
