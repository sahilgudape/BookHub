import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import bookService from "../../service/BookService";

const ViewAllBooks = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]); // 🔹 for search results
  const [msg, setMsg] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;
  // const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    bookService
      .getAllBooks()
      .then((res) => {
        setBooks(res.data);

        setFilteredBooks(res.data.data || []);
      })
      .catch((err) => {
        setMsg("Failed to load books");
      });
  }, []);

  // 🔍 Search handler
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredBooks(books); // reset
    } else {
      const lower = searchTerm.toLowerCase();
      const results = books.filter(
        (b) =>
          b.book_title.toLowerCase().includes(lower) ||
          b.author.toLowerCase().includes(lower)
      );
      setFilteredBooks(results);
      setCurrentPage(1);
    }
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className="container mt-4">
      {/* 🔹 Header + Total + Search */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-primary fw-bold end">📚 View All Books</h3>
        <span className="badge bg-secondary">
          Total Books: {filteredBooks.length}
        </span>
      </div>

      {/* 🔍 Search Bar */}
      <div className="input-group mb-3 shadow-sm">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          🔍 Search
        </button>
      </div>

      {msg && <div className="alert alert-danger">{msg}</div>}

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-bordered table-striped table-hover align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>Book ID</th>
              <th>Image</th>
              <th>Book Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>ISBN</th>
              <th>Category Id</th>
              <th>Total Copies</th>
              <th>Available</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {
              currentBooks.length > 0 ? (
                currentBooks.map((b) => (
                  <tr key={b.books_id}>
                    <td>{b.books_id}</td>
                    <td>
                      {b.image ? (
                        <img
                          // src={b.image}
                          src={`http://localhost:3000/${b.image}`}
                          alt={b.book_title}
                          className="rounded shadow-sm"
                          style={{
                            width: "85px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <span className="text-muted">No Image</span>
                      )}
                    </td>
                    <td className="fw-semibold">{b.book_title}</td>
                    <td>{b.author}</td>
                    <td>{b.publisher}</td>
                    <td>{b.isbn}</td>
                    <td>{b.category_name}</td>
                    <td>{b.total_copies}</td>
                    <td>{b.available_copies}</td>
                    <td>
                      <span
                        className={`badge ${
                          b.status === "Available" ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>

                    <td>{new Date(b.created_at).toLocaleString()}</td>
                    <td>
                      <div className="d-grid gap-2">
                        <NavLink
                          to={`/deleteBook/${b.books_id}`}
                          className="btn btn-sm btn-danger"
                        >
                          🗑 Delete
                        </NavLink>
                        <NavLink
                          to={`book/updatebook/${b.books_id}`}
                          className="btn btn-sm btn-warning"
                        >
                          ✏️ Update
                        </NavLink>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center text-muted">
                    No books found
                  </td>
                </tr>
              )
              // navigate("/addbooks")
            }
          </tbody>
        </table>
      </div>

      {/* 🔹 Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-end mt-3">
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  ◀ Prev
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
                  Next ▶
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default ViewAllBooks;
