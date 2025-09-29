import React, { useState, useEffect } from "react";
import BorrowService from "../../service/BorrowService";

const BorrowHistory = () => {
  const [borrowHistory, setBorrowHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, borrowed, returned, overdue

  useEffect(() => {
    loadBorrowHistory();
  }, []);

  const loadBorrowHistory = () => {
    setLoading(true);
    BorrowService.getBorrowHistory()
      .then((res) => {
        setBorrowHistory(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load borrow history:", err);
        setLoading(false);
      });
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

  const filteredHistory = borrowHistory.filter((item) => {
    if (filter === "all") return true;
    return item.status === filter;
  });

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <div>
          <h2 className="fw-bold mb-2">Borrow History</h2>
          <p className="text-muted mb-0">Your complete borrowing history</p>
        </div>

        <div className="d-flex gap-2">
          <select
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Borrowed">Borrowed</option>
            <option value="Returned">Returned</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
          <p className="text-muted mt-3">Loading history...</p>
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body">
            {filteredHistory.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Book</th>
                      <th>Borrow Date</th>
                      <th>Due Date</th>
                      <th>Return Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredHistory.map((history) => (
                      <tr key={history.borrow_id}>
                        <td>
                          <div className="d-flex align-items-center">
                            {history.book?.image && (
                              <img
                                src={`http://localhost:3000/${history.book.image}`}
                                alt={history.book.book_title}
                                className="rounded me-3"
                                style={{
                                  width: "40px",
                                  height: "60px",
                                  objectFit: "cover",
                                }}
                              />
                            )}
                            <div>
                              <h6 className="mb-1 fw-medium">
                                {history.book?.book_title}
                              </h6>
                              <small className="text-muted">
                                by {history.book?.author}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>
                          {new Date(history.borrow_date).toLocaleDateString()}
                        </td>
                        <td>
                          {new Date(history.due_date).toLocaleDateString()}
                        </td>
                        <td>
                          {history.return_date
                            ? new Date(history.return_date).toLocaleDateString()
                            : "-"}
                        </td>
                        <td>{getStatusBadge(history.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-5">
                <i className="bi bi-clock-history display-4 d-block mb-2 text-muted"></i>
                <p className="text-muted">No borrow history found</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BorrowHistory;
