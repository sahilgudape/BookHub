const db = require("../../db.js");

exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("select * from users where user_id = ?", [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      "select * from users where user_email = ?",
      [email],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

exports.updateUserProfile = (name, email, id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "update users set user_name = ?, user_email = ? where user_id = ?",
      [name, email, id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

exports.updatePassword = (password, id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "update users set password = ? where user_id = ?",
      [password, id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

exports.viewReturnedBooks = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `select b.book_title, b.author, i.issue_date, i.return_date 
                     from issue_details i 
                     inner JOIN books b ON i.book_id = b.books_id 
                     where i.status = 'returned' AND i.user_id = ? 
                     ORDER BY i.return_date DESC`;

    db.query(sql, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.viewIssuedBooks = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `select b.book_title, b.author, i.issue_date, i.return_date, i.status 
                     from issue_details i 
                     inner JOIN books b ON i.book_id = b.books_id 
                     where i.status != 'returned' AND i.user_id = ? 
                     ORDER BY i.issue_date DESC`;

    db.query(sql, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.getDashboardStats = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `select 
            (select COUNT(*) from issue_details where status = 'issued' AND user_id = ?) as totalIssued,
            (select COUNT(*) from issue_details where status = 'returned' AND user_id = ?) as totalReturned,
            (select COUNT(*) from issue_details where status = 'overdue' AND user_id = ?) as totalOverdue`;

    db.query(sql, [id, id, id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.getAllBooks = () => {
  return new Promise((resolve, reject) => {
    const sql = `select b.books_id, b.book_title, b.author, b.publisher, b.isbn, 
                     c.category_name, b.total_copies, b.available_copies, b.status, b.image
                     from books b 
                     LEFT JOIN categories c ON b.category_id = c.category_id
                     where b.available_copies > 0`;

    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.getBorrowHistory = (userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "select * FROM borrow_history WHERE user_id = ? ORDER BY borrowed_at DESC",
      [userId],
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      }
    );
  });
};

exports.getMyBorrowedBooks = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT i.id as borrow_id, i.book_id, i.user_id, i.issue_date as borrow_date, DATE_ADD(i.issue_date, INTERVAL 7 DAY) as due_date,
        i.return_date, CASE WHEN i.status = 'issued' AND DATEDIFF(CURDATE(), i.issue_date) > 7 THEN 'Overdue' WHEN i.status = 'issued' THEN 'Borrowed'
        ELSE i.status END as status, b.books_id, b.book_title, b.author,b.publisher, b.isbn, 
        b.image, c.category_name FROM issue_details i JOIN books b ON i.book_id = b.books_id LEFT JOIN categories c ON b.category_id = c.category_id
      WHERE i.user_id = ? AND i.status != 'returned'ORDER BY i.issue_date DESC`;

    db.query(sql, [userId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.searchBooks = (searchTerm) => {
  return new Promise((resolve, reject) => {
    const sql = `select b.books_id, b.book_title, b.author, b.publisher, b.isbn, 
                     c.category_name, b.total_copies, b.available_copies, b.status, b.image
                     from books b 
                     LEFT JOIN categories c ON b.category_id = c.category_id
                     where (b.book_title LIKE ? OR b.author LIKE ?) AND b.available_copies > 0`;

    db.query(sql, [`%${searchTerm}%`, `%${searchTerm}%`], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
