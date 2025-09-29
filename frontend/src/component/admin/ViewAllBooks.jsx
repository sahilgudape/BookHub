import React, { useEffect, useState, useCallback } from "react";
import { Link, NavLink } from "react-router-dom";
import bookService from "../../service/BookService";

const ViewAllBooks = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const booksPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Load books from API
  const loadBooks = useCallback(() => {
    setLoading(true);
    bookService
      .getAllBooks()
      .then((res) => {
        const data = res.data.data || [];
        setBooks(data);
        setFilteredBooks(data);
        setLoading(false);
      })
      .catch(() => {
        setMsg("Failed to load books");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  // Delete book
  const handleDelete = useCallback(
    (bookId) => {
      if (window.confirm("Are you sure you want to delete this book?")) {
        bookService
          .deletebook(bookId)
          .then(() => {
            alert("Book deleted successfully!");
            loadBooks();
          })
          .catch((err) => {
            alert(
              "Failed to delete book: " +
                (err.response?.data?.message || err.message)
            );
          });
      }
    },
    [loadBooks]
  );

  // Search
  const handleSearch = useCallback(() => {
    if (searchTerm.trim() === "") {
      setFilteredBooks(books);
    } else {
      const lower = searchTerm.toLowerCase();
      const results = books.filter(
        (b) =>
          b.book_title?.toLowerCase().includes(lower) ||
          b.author?.toLowerCase().includes(lower) ||
          b.isbn?.toLowerCase().includes(lower)
      );
      setFilteredBooks(results);
      setCurrentPage(1);
    }
  }, [searchTerm, books]);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const getStatusBadge = (status, available) => {
    if (available === 0)
      return <span className="badge bg-danger">Out of Stock</span>;
    if (available <= 2)
      return <span className="badge bg-warning">Low Stock</span>;
    return <span className="badge bg-success">Available</span>;
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <div>
          <h2 className="fw-bold mb-2">Book Collection</h2>
          <p className="text-muted mb-0">
            Manage your library's book inventory
          </p>
        </div>
        <NavLink to="/admin/books/add" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>Add New Book
        </NavLink>
      </div>

      {/* Search + Filter */}
      <div className="row mb-4">
        <div className="col-md-8">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search books by title, author, or ISBN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
        </div>
        <div className="col-md-4 d-flex gap-2">
          <button
            className="btn btn-primary flex-grow-1"
            onClick={handleSearch}
          >
            <i className="bi bi-search me-2"></i>Search
          </button>
          <button
            className="btn btn-outline-secondary flex-grow-1"
            onClick={() => {
              setSearchTerm("");
              setFilteredBooks(books);
            }}
          >
            Clear
          </button>
        </div>
      </div>

      {msg && (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          {msg}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMsg("")}
          ></button>
        </div>
      )}

      {/* Books Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary"></div>
              <p className="text-muted mt-3">Loading books...</p>
            </div>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Books ({filteredBooks.length})</h5>
              </div>

              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Book Details</th>
                      <th>Category</th>
                      <th>Publisher</th>
                      <th>Copies</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentBooks.length > 0 ? (
                      currentBooks.map((b) => (
                        <tr key={b.books_id}>
                          <td>
                            <div className="d-flex align-items-center">
                              {b.image && (
                                <img
                                  src={`http://localhost:3000/${b.image}`}
                                  alt={b.book_title}
                                  className="rounded me-3"
                                  style={{
                                    width: "50px",
                                    height: "70px",
                                    objectFit: "cover",
                                  }}
                                />
                              )}
                              <div>
                                <h6 className="mb-1 fw-medium">
                                  {b.book_title}
                                </h6>
                                <small className="text-muted">
                                  by {b.author}
                                </small>
                                <br />
                                <small className="text-muted">
                                  ISBN: {b.isbn}
                                </small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-primary bg-opacity-10 text-primary">
                              {b.category_name}
                            </span>
                          </td>
                          <td>
                            <small className="text-muted">{b.publisher}</small>
                          </td>
                          <td>
                            <div className="small">
                              <div>Total: {b.total_copies}</div>
                              <div className="text-success">
                                Available: {b.available_copies}
                              </div>
                            </div>
                          </td>
                          <td>
                            {getStatusBadge(b.status, b.available_copies)}
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <NavLink
                                to={`/admin/books/update/${b.books_id}`}
                                className="btn btn-outline-primary btn-sm"
                              >
                                <i className="bi bi-pencil"></i>
                              </NavLink>
                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => handleDelete(b.books_id)}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center text-muted py-5">
                          <i className="bi bi-book display-4 d-block mb-2"></i>
                          No books found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="d-flex justify-content-center mt-4">
                  <ul className="pagination">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        Previous
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, i) => (
                      <li
                        key={i}
                        className={`page-item ${
                          currentPage === i + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAllBooks;
