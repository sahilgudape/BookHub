import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AdminService from "../../service/AdminService";

const ViewAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const result = await AdminService.getAllUsers();

      let usersData = [];

      // Handle different response structures
      if (Array.isArray(result.data)) {
        usersData = result.data;
      } else if (result.data && Array.isArray(result.data.users)) {
        usersData = result.data.users;
      } else if (
        result.data &&
        result.data.data &&
        Array.isArray(result.data.data)
      ) {
        usersData = result.data.data;
      } else if (result.data && Array.isArray(result.data.result)) {
        usersData = result.data.result;
      } else {
        usersData = result.data ? [result.data] : [];
      }

      setUsers(usersData);
      setFilteredUsers(usersData);
      setTotalItems(usersData.length);
      setTotalPages(Math.ceil(usersData.length / itemsPerPage));
      setLoading(false);
      setError("");
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
      setLoading(false);
      console.error("Error fetching users:", err);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
      setTotalItems(users.length);
      setTotalPages(Math.ceil(users.length / itemsPerPage));
    } else {
      const filtered = users.filter(
        (user) =>
          (user.user_name || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (user.user_email || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (user.role || "").toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
      setTotalItems(filtered.length);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    }
    setCurrentPage(1);
  };

  const handleClear = () => {
    setSearchTerm("");
    setFilteredUsers(users);
    setTotalItems(users.length);
    setTotalPages(Math.ceil(users.length / itemsPerPage));
    setCurrentPage(1);
  };

  const handleDelete = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete user "${userName}"?`)) {
      try {
        await AdminService.deleteUser(userId);
        alert(`User "${userName}" deleted successfully`);
        fetchUsers();
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete user. Please try again.");
      }
    }
  };

  // Get current users for pagination
  const getCurrentUsers = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  const currentUsers = getCurrentUsers();

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="text-center py-5">
          <div
            className="spinner-border text-primary"
            style={{ width: "3rem", height: "3rem" }}
          ></div>
          <p className="text-muted mt-3">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <div>
          <h2 className="fw-bold mb-2">User Management</h2>
          <p className="text-muted mb-0">
            Manage library users and their permissions
          </p>
        </div>
        <NavLink to="/admin/users/add" className="btn btn-primary">
          <i className="bi bi-person-plus me-2"></i>Add New User
        </NavLink>
      </div>

      {/* Search + Filter */}
      <div className="row mb-4">
        <div className="col-md-8">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search users by name, email, or role..."
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
            onClick={handleClear}
          >
            <i className="bi bi-x-circle me-2"></i>Clear
          </button>
        </div>
      </div>

      {/* Items per page selector */}
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="d-flex align-items-center">
            <label className="me-2 text-muted">Show:</label>
            <select
              className="form-select form-select-sm w-auto"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="ms-2 text-muted">entries per page</span>
          </div>
        </div>
        <div className="col-md-6 text-md-end">
          <span className="text-muted">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
            users
          </span>
        </div>
      </div>

      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError("")}
          ></button>
        </div>
      )}

      {/* Users Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>User Details</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length > 0 ? (
                  currentUsers.map((user) => (
                    <tr key={user.user_id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div
                            className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                            style={{
                              width: "45px",
                              height: "45px",
                              fontSize: "18px",
                            }}
                          >
                            {user.user_name
                              ? user.user_name.charAt(0).toUpperCase()
                              : "U"}
                          </div>
                          <div>
                            <h6 className="mb-1 fw-medium">
                              {user.user_name || "Unknown User"}
                            </h6>
                            <small className="text-muted">
                              ID: {user.user_id}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <small className="text-muted">
                          {user.user_email || "N/A"}
                        </small>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            user.role === "admin"
                              ? "bg-danger"
                              : user.role === "librarian"
                              ? "bg-warning"
                              : "bg-primary"
                          }`}
                        >
                          {user.role || "user"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            user.status === "active"
                              ? "bg-success"
                              : "bg-secondary"
                          }`}
                        >
                          {user.status || "inactive"}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <NavLink
                            to={`/admin/users/update/${user.user_id}`}
                            className="btn btn-outline-primary btn-sm"
                          >
                            <i className="bi bi-pencil"></i>
                          </NavLink>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() =>
                              handleDelete(user.user_id, user.user_name)
                            }
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-5">
                      <i className="bi bi-people display-4 d-block mb-2"></i>
                      {searchTerm
                        ? "No users match your search"
                        : "No users found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Enhanced Pagination */}
          {totalPages > 1 && (
            <nav className="d-flex justify-content-between align-items-center mt-4">
              <div>
                <span className="text-muted">
                  Page {currentPage} of {totalPages}
                </span>
              </div>

              <ul className="pagination mb-0">
                {/* First Page */}
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                  >
                    <i className="bi bi-chevron-double-left"></i>
                  </button>
                </li>

                {/* Previous Page */}
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <i className="bi bi-chevron-left"></i>
                  </button>
                </li>

                {/* Page Numbers */}
                {getPageNumbers().map((pageNumber, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      pageNumber === currentPage ? "active" : ""
                    } ${pageNumber === "..." ? "disabled" : ""}`}
                  >
                    {pageNumber === "..." ? (
                      <span className="page-link">...</span>
                    ) : (
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    )}
                  </li>
                ))}

                {/* Next Page */}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </li>

                {/* Last Page */}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    <i className="bi bi-chevron-double-right"></i>
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAllUsers;
