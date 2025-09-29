import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookService from "../../service/BookService";

const BrowseBooks = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6; // 6 books → 2 rows × 3 columns

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = () => {
    setLoading(true);
    BookService.getAllBooks()
      .then((res) => {
        const data = res.data.data || [];
        setBooks(data);
        setFilteredBooks(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredBooks(books);
    } else {
      const lower = searchTerm.toLowerCase();
      const results = books.filter(
        (b) =>
          b.book_title?.toLowerCase().includes(lower) ||
          b.author?.toLowerCase().includes(lower) ||
          b.category_name?.toLowerCase().includes(lower)
      );
      setFilteredBooks(results);
    }
    setCurrentPage(1); // reset to first page after search
  };

  // calculate pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <div>
          <h2 className="fw-bold mb-2">Browse Books</h2>
          <p className="text-muted mb-0">Explore our library collection</p>
        </div>
      </div>

      {/* Search */}
      <div className="row mb-4">
        <div className="col-md-8">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search books by title, author, or category..."
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
              setCurrentPage(1);
            }}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Books Grid */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
          <p className="text-muted mt-3">Loading books...</p>
        </div>
      ) : (
        <>
          <div className="row">
            {currentBooks.map((book) => (
              <div key={book.books_id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div
                    className="card-img-top"
                    style={{ height: "250px", overflow: "hidden" }}
                  >
                    <img
                      src={`http://localhost:3000/${book.image}`}
                      alt={book.book_title}
                      className="img-fluid w-100 h-100"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{book.book_title}</h5>
                    <p className="card-text text-muted">by {book.author}</p>
                    <div className="mb-2">
                      <span className="badge bg-primary bg-opacity-10 text-primary">
                        {book.category_name}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span
                        className={`badge ${
                          book.available_copies > 0 ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {book.available_copies > 0
                          ? "Available"
                          : "Out of Stock"}
                      </span>
                      <Link
                        to={`/user/book/${book.books_id}`}
                        className="btn btn-sm btn-primary"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav>
              <ul className="pagination justify-content-center">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
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
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}

      {filteredBooks.length === 0 && !loading && (
        <div className="text-center py-5">
          <i className="bi bi-book display-4 d-block mb-2 text-muted"></i>
          <p className="text-muted">No books found</p>
        </div>
      )}
    </div>
  );
};

export default BrowseBooks;
