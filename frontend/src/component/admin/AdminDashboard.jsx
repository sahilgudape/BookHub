import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import ViewAllBooks from "./ViewAllBooks";
import AddBook from "./AddBook";
import UpdateBook from "./UpdateBook";
import ViewCategory from "./ViewCategory";
import ViewAllUsers from "./ViewAllUsers";
import AddUser from "./AddUser";
import UpdateUser from "./UpdateUser";
import UpdateCategory from "./UpdateCategory";

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  // 🔑 Redirect non-admin users
  useEffect(() => {
    if (!role || role.toLowerCase() !== "admin") {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login", { replace: true });
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onLogout={handleLogout}
      />

      {/* Main Section */}
      <div className="flex-grow-1">
        {/* Top Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top shadow-sm">
          <div className="container-fluid px-3">
            <button
              className="btn btn-link text-white d-lg-none"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <i className="bi bi-list fs-4"></i>
            </button>

            <h4 className="navbar-brand mb-0 fw-bold text-dark">
              <i className="bi bi-journal-bookmark-fill me-2"></i>
              Library Admin Panel
            </h4>

            <div className="d-flex align-items-center gap-3">
              <span className="text-dark-50 d-none d-md-inline">
                Welcome, Admin
              </span>
              <button
                className="btn btn-outline-dark btn-sm"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-2"></i>
                Logout
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="content-wrapper fade-in">
          <div className="container-fluid py-4">
            <Routes>
              <Route path="*" element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="books" element={<ViewAllBooks />} />
              <Route path="books/add" element={<AddBook />} />
              <Route path="books/update/:id" element={<UpdateBook />} />
              <Route path="users" element={<ViewAllUsers />} />
              <Route path="users/add" element={<AddUser />} />
              <Route path="users/update/:id" element={<UpdateUser />} />
              <Route path="categories" element={<ViewCategory />} />
              <Route
                path="categories/update/:id"
                element={<UpdateCategory />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
