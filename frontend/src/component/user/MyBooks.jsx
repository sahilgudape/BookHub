import React, { useState, useEffect } from "react";
import BorrowService from "../../service/BorrowService";

const MyBooks = ({ userData }) => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBorrowedBooks();
  }, []);

  const loadBorrowedBooks = () => {
    setLoading(true);
    BorrowService.getMyBorrowedBooks()
      .then((res) => {
        console.log("Borrowed books data:", res.data); // Debug log
        setBorrowedBooks(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load borrowed books:", err);
        setLoading(false);
      });
  };

  const handleReturnBook = (issueId) => {
    if (window.confirm("Are you sure you want to return this book?")) {
      BorrowService.returnBook(issueId)
        .then(() => {
          alert("Book returned successfully!");
          loadBorrowedBooks();
        })
        .catch((err) => {
          alert(
            "Failed to return book: " +
              (err.response?.data?.message || err.message)
          );
        });
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Borrowed":
        return <span className="badge bg-primary">Borrowed</span>;
      case "Returned":
        return <span className="badge bg-success">Returned</span>;
      case "Overdue":
        return <span className="badge bg-danger">Overdue</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <div>
          <h2 className="fw-bold mb-2">My Borrowed Books</h2>
          <p className="text-muted mb-0">
            Manage your currently borrowed books
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
          <p className="text-muted mt-3">Loading your books...</p>
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body">
            {borrowedBooks.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Book Details</th>
                      <th>Borrow Date</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {borrowedBooks.map((book) => (
                      <tr key={book.borrow_id || book.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            {book.image && (
                              <img
                                src={`http://localhost:3000/${book.image}`}
                                alt={book.book_title}
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
                                {book.book_title}
                              </h6>
                              <small className="text-muted">
                                by {book.author}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>
                          {new Date(book.borrow_date).toLocaleDateString()}
                        </td>
                        <td>{new Date(book.due_date).toLocaleDateString()}</td>
                        <td>{getStatusBadge(book.status)}</td>
                        <td>
                          {book.status === "Borrowed" && (
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() =>
                                handleReturnBook(book.borrow_id || book.id)
                              }
                            >
                              Return Book
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-5">
                <i className="bi bi-book display-4 d-block mb-2 text-muted"></i>
                <p className="text-muted">You haven't borrowed any books yet</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooks;
