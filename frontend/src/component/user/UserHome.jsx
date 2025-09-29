import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookService from "../../service/BookService";

const UserHome = ({ userData }) => {
  const [recentBooks, setRecentBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    BookService.getAllBooks()
      .then((res) => {
        const data = res.data.data || [];
        // Get 6 most recent books
        setRecentBooks(data.slice(0, 6));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="container-fluid">
      {/* Welcome Section */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="card bg-primary text-white shadow">
            <div className="card-body p-5">
              <h1 className="display-4 fw-bold">Welcome, {userData?.name}!</h1>
              <p className="lead mb-0">
                Explore our library collection and manage your borrowed books.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="row mb-5">
        <div className="col-md-4 mb-4 mb-md-0">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center p-4">
              <i className="bi bi-book fs-1 text-primary mb-3"></i>
              <h3 className="fw-bold">5+</h3>
              <p className="text-muted mb-0">Books Available</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4 mb-md-0">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center p-4">
              <i className="bi bi-people fs-1 text-primary mb-3"></i>
              <h3 className="fw-bold">24/7</h3>
              <p className="text-muted mb-0">Online Access</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center p-4">
              <i className="bi bi-collection fs-1 text-primary mb-3"></i>
              <h3 className="fw-bold">10+</h3>
              <p className="text-muted mb-0">Categories</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Books */}
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">Recently Added Books</h2>
            <Link to="/user/browse" className="btn btn-primary">
              View All Books <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary"></div>
              <p className="text-muted mt-3">Loading books...</p>
            </div>
          ) : (
            <div className="row">
              {recentBooks.map((book) => (
                <div key={book.books_id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div
                      className="card-img-top"
                      style={{ height: "200px", overflow: "hidden" }}
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
                      <div className="d-flex justify-content-between align-items-center">
                        <span
                          className={`badge ${
                            book.available_copies > 0
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {book.available_copies > 0
                            ? "Available"
                            : "Out of Stock"}
                        </span>
                        <Link
                          to={`/user/book/${book.books_id}`}
                          className="btn btn-sm btn-outline-primary"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserHome;
