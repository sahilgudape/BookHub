const db = require("../../db.js");

exports.createBook = (book) => {
  return new Promise((resolve, reject) => {
    const query = `insert into books (book_title, author, publisher, isbn, category_id, total_copies, available_copies, status, image) values (?, ?, ?, ?, (select category_id from categories where lower(category_name) = lower(?)), ?, ?, ?, ?)`;

    const values = [
      book.book_title,
      book.author,
      book.publisher,
      book.isbn,
      book.category_name,
      book.total_copies,
      book.available_copies,
      book.status,
      book.image,
    ];

    db.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Get all books
exports.getAllBooks = () => {
  return new Promise((resolve, reject) => {
    const sql = `select b.books_id, b.book_title, b.author, b.publisher, b.isbn, c.category_name, b.total_copies, b.available_copies, b.status, b.image, b.created_at from books b join categories c on b.category_id = c.category_id`;
    db.query(sql, (err, result) => {
      if (err) {
        reject("Error occur for getting all books : " + err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.updateBook = (bookData, id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `update books set book_title = ?, author = ?, publisher = ?, isbn = ?, category_id = (select category_id from categories where category_name = ?), total_copies = ?, available_copies = ?, status = ?, image = ? where books_id = ?`;

    const values = [
      bookData.book_title,
      bookData.author,
      bookData.publisher,
      bookData.isbn,
      bookData.category_name,
      bookData.total_copies,
      bookData.available_copies,
      bookData.status,
      bookData.image,
      id,
    ];

    db.query(sqlQuery, values, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

exports.deleteBook = (id) => {
  return new Promise((resolve, reject) => {
    db.query("delete from books where books_id = ?", [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.getBookByName = (bookName) => {
  return new Promise((resolve, reject) => {
    db.query(
      "select * from books where LOWER(book_title) = LOWER(?)",
      [bookName],
      (err, result) => {
        if (err) {
          reject("Error at books by name " + err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

exports.getBookById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("select * from books where books_id = ?", [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

//For the user
//===============================================================================================================

exports.searchBooksByCategory = (category) => {
  return new Promise((resolve, reject) => {
    const sql = `
      select b.books_id as id, b.book_title as title, b.author, b.available_copies, b.status, b.image from books b inner join categories c ON b.category_id = c.category_id
      where lower(c.category_name) = lower(?)
    `;
    db.query(sql, [category], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

exports.searchBooksByAuthor = (author) => {
  return new Promise((resolve, reject) => {
    db.query(
      "select * from books where author like '%" + author + "%'",
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
