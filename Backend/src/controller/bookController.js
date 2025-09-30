const bookModel = require("../models/bookmodel.js");

exports.createBook = (req, res) => {
  const {
    title,
    author,
    publisher,
    isbn,
    category_name,
    total_copies,
    available_copies,
    status,
  } = req.body;
  const image = req.file ? req.file.filename : null;

  if (
    !title ||
    !author ||
    !publisher ||
    !isbn ||
    !category_name ||
    !total_copies ||
    !available_copies
  ) {
    return res.status(400).json({
      error: "All fields are required.",
    });
  }

  const bookData = {
    book_title: title,
    author,
    publisher,
    isbn,
    category_name,
    total_copies,
    available_copies,
    status,
    image,
  };

  const promise = bookModel.createBook(bookData);

  promise
    .then((result) => {
      return res
        .status(201)
        .json({ message: "Saved successfully...!", result });
    })
    .catch((err) => {
      console.log("Error in BookController is:-->  ", err);
      return res.status(500).json({ error: "Not saved", details: err.message });
    });
};

// GET /api/books
exports.getAllBooks = (req, res) => {
  const promise = bookModel.getAllBooks();

  promise
    .then((result) => {
      if (!result || result.length === 0) {
        return res.status(404).json({ message: "No books found" });
      }
      return res.status(201).json({ data: result });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Failed to fetch books", error: err.message });
    });
};

exports.updateBook = (req, res) => {
  const id = req.params.id;
  const {
    title,
    author,
    publisher,
    isbn,
    category_name,
    total_copies,
    available_copies,
    status,
  } = req.body;
  const image = req.file ? req.file.filename : null;

  const bookData = {
    book_title: title,
    author,
    publisher,
    isbn,
    category_name,
    total_copies,
    available_copies,
    status,
    image,
  };

  bookModel
    .updateBook(bookData, id)
    .then((result) => {
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).json({ message: "Book updated successfully!" });
    })
    .catch((err) => {
      console.log("Update Book controller err --->", err);

      return res
        .status(500)
        .json({ message: "Failed to update book", error: err.message });
    });
};

exports.deleteBook = (req, res) => {
  let id = req.params.id;

  let promiss = bookModel.deleteBook(id);

  promiss
    .then((result) => {
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).json({ message: "Book deleted successfully" });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Failed to delete book", error: err.message });
    });
};

exports.getBookByName = (req, res) => {
  const name = req.params.name;

  const promise = bookModel.getBookByName(name);

  promise
    .then((result) => {
      if (result.length === 0) {
        return res.json({ message: "Book not found" });
      }
      res.json(result);
    })
    .catch((err) => {
      res.json({ message: "Something went wrong", error: err });
    });
};

//Get books by Id

exports.getBookById = (req, res) => {
  const id = req.params.bid;

  const promise = bookModel.getBookById(id);

  promise
    .then((result) => {
      if (result.length === 0) {
        res.json({ message: "Book not found" });
      } else {
        res.json(result);
      }
    })
    .catch((err) => {
      res.json({ error: "Error fetching book by ID", details: err });
    });
};

//for user

exports.searchBookByCategory = (req, res) => {
  const category = req.query.category;

  bookModel
    .searchBooksByCategory(category)
    .then((result) => {
      if (result.length > 0) {
        res.json({ message: "Books found", data: result });
      } else {
        res.status(404).json({ message: "No books found in this category" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.searchBookByAuthor = (req, res) => {
  const author = req.query.author;
  const promise = bookModel.getBookByAuthor(author);

  promise
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      res.send(err);
    });
};
