import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookService from "../../service/BookService";
import BorrowService from "../../service/BorrowService";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [borrowing, setBorrowing] = useState(false);

  useEffect(() => {
    loadBookDetails();
  }, [id]);

  const loadBookDetails = () => {
    setLoading(true);
    BookService.getBookById(id)
      .then((res) => {
        setBook(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load book details:", err);
        setLoading(false);
      });
  };

  const handleBorrowBook = () => {
    if (!book || book.available_copies <= 0) return;

    setBorrowing(true);
    BorrowService.borrowBook(id)
      .then((res) => {
        alert("Book borrowed successfully!");
        loadBookDetails(); // Refresh book details to update available copies
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Failed to borrow book");
      })
      .finally(() => {
        setBorrowing(false);
      });
  };

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
          <p className="text-muted mt-3">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container-fluid">
        <div className="text-center py-5">
          <i className="bi bi-book display-4 d-block mb-2 text-muted"></i>
          <p className="text-muted">Book not found</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/user/browse")}
          >
            Back to Books
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate("/user/browse")}
      >
        <i className="bi bi-arrow-left me-2"></i>Back to Books
      </button>

      <div className="row">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <img
                src={`http://localhost:3000/${book.image}`}
                alt={book.book_title}
                className="img-fluid rounded"
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="fw-bold mb-3">{book.book_title}</h1>

              <div className="mb-4">
                <h5 className="text-muted">by {book.author}</h5>
              </div>

              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="mb-3">
                    <strong>Publisher:</strong> {book.publisher || "N/A"}
                  </div>
                  <div className="mb-3">
                    <strong>ISBN:</strong> {book.isbn}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <strong>Category:</strong>
                    <span className="badge bg-primary bg-opacity-10 text-primary ms-2">
                      {book.category_name}
                    </span>
                  </div>
                  <div className="mb-3">
                    <strong>Status:</strong>
                    <span
                      className={`badge ${
                        book.available_copies > 0 ? "bg-success" : "bg-danger"
                      } ms-2`}
                    >
                      {book.available_copies > 0 ? "Available" : "Out of Stock"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="card bg-light">
                    <div className="card-body text-center">
                      <h4 className="fw-bold">{book.total_copies}</h4>
                      <p className="text-muted mb-0">Total Copies</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card bg-light">
                    <div className="card-body text-center">
                      <h4 className="fw-bold text-success">
                        {book.available_copies}
                      </h4>
                      <p className="text-muted mb-0">Available Copies</p>
                    </div>
                  </div>
                </div>
              </div>

              {book.available_copies > 0 && (
                <button
                  className="btn btn-primary btn-lg w-100"
                  onClick={handleBorrowBook}
                  disabled={borrowing}
                >
                  {borrowing ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Borrowing...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-bookmark-plus me-2"></i>
                      Borrow This Book
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
