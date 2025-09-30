const db = require("../../db.js");

// Issue a book
exports.issueBook = ({ book_id, user_id, issue_date }) => {
  return new Promise((resolve, reject) => {
    // Check if the book exists and has available copies
    db.query(
      "SELECT * FROM books WHERE books_id = ? AND available_copies > 0",
      [book_id],
      (err, bookResults) => {
        if (err) {
          return reject(err);
        }
        if (bookResults.length === 0) {
          return reject("Book does not exist or no copies available");
        }

        db.query(
          "SELECT * FROM users WHERE user_id = ?",
          [user_id],
          (err2, userResults) => {
            if (err2) return reject(err2);
            if (userResults.length === 0) return reject("User does not exist");

            // Both exist, now issue the book
            const query =
              "INSERT INTO issue_details (book_id, user_id, issue_date, status) VALUES (?, ?, ?, 'issued')";
            db.query(query, [book_id, user_id, issue_date], (err3, result) => {
              if (err3) return reject(err3);

              // Decrease available copies
              db.query(
                "UPDATE books SET available_copies = available_copies - 1 WHERE books_id = ?",
                [book_id],
                (err4) => {
                  if (err4) return reject(err4);
                  resolve(result);
                }
              );
            });
          }
        );
      }
    );
  });
};

exports.returnBook = ({ issue_id, return_date }) => {
  return new Promise((resolve, reject) => {
    // Get issue details
    db.query(
      `SELECT * FROM issue_details WHERE id = ?`,
      [issue_id],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        if (results.length === 0) {
          return reject("Issue record not found");
        }

        const issue = results[0];
        const issueDate = new Date(issue.issue_date);
        const returnDate = new Date(return_date);

        // Calculate fine (e.g., 10/day after 7 days)
        const diffDays = Math.ceil(
          (returnDate - issueDate) / (1000 * 60 * 60 * 24)
        );

        let fine = 0;
        if (diffDays > 7) {
          fine = (diffDays - 7) * 10;
        }

        // Update issue details
        db.query(
          `UPDATE issue_details SET return_date=?, status='returned' WHERE id=?`,
          [return_date, issue_id],
          (err2) => {
            if (err2) return reject(err2);
            // Increase available copies
            db.query(
              `UPDATE books SET available_copies = available_copies + 1 WHERE books_id=?`,
              [issue.book_id],
              (err3) => {
                if (err3) return reject(err3);
                resolve({ message: "Book returned", fine });
              }
            );
          }
        );
      }
    );
  });
};

// View issued books for a user
exports.getIssuedBooks = (user_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT i.*, b.book_title, b.author 
      FROM issue_details i
      JOIN books b ON i.book_id = b.books_id
      WHERE i.user_id = ?
    `;
    db.query(query, [user_id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// View pending fines for a user
exports.getPendingFines = (user_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT i.*, b.book_title, b.author, 
      DATEDIFF(CURDATE(), i.issue_date) - 7 AS overdue_days,
      (DATEDIFF(CURDATE(), i.issue_date) - 7) * 10 AS fine
      FROM issue_details i
      JOIN books b ON i.book_id = b.books_id
      WHERE i.user_id = ? AND i.status='issued' AND DATEDIFF(CURDATE(), i.issue_date) > 7
    `;
    db.query(query, [user_id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};
