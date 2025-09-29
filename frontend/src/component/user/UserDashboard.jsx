import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import UserHome from "./UserHome";
import BrowseBooks from "./BrowseBooks";
import MyBooks from "./MyBooks";
import MyProfile from "./MyProfile";
import BookDetails from "./BookDetails";
import UserService from "../../service/UserService";
import BorrowHistory from "./BorrowHistory";

export default function UserDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userData, setUserData] = useState(null);
  const [userDataLoaded, setUserDataLoaded] = useState(false);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (!role || role.toLowerCase() !== "user") {
      navigate("/login", { replace: true });
    } else if (!userDataLoaded) {
      fetchUserData();
    }
  }, [role, navigate]);

  const fetchUserData = () => {
    UserService.getProfile()
      .then((res) => {
        if (res.data && res.data.data) {
          setUserData(res.data.data);
        }
        setUserDataLoaded(true);
      })
      .catch((err) => {
        console.error("Failed to fetch user data:", err);
        const userName = localStorage.getItem("userName") || "User";
        const userEmail = localStorage.getItem("userEmail") || "";

        setUserData({
          name: userName,
          email: userEmail,
          // Add fallback data to prevent errors
          user_id: localStorage.getItem("userId") || "N/A",
        });
        setUserDataLoaded(true);
      });
  };
  const handleLogout = () => {
    UserService.logout()
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userId");
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        console.error("Logout error:", err);
        // Fallback logout - clear localStorage anyway
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userId");
        navigate("/login", { replace: true });
      });
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <UserSidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onLogout={handleLogout}
        userData={userData}
      />

      {/* Main Section */}
      <div className="flex-grow-1">
        {/* Top Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
          <div className="container-fluid px-3">
            <button
              className="btn btn-link text-dark d-lg-none"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <i className="bi bi-list fs-4"></i>
            </button>

            <h4 className="navbar-brand mb-0 fw-bold text-primary">
              <i className="bi bi-journal-bookmark-fill me-2"></i>
              Library Portal
            </h4>

            <div className="d-flex align-items-center gap-3">
              <span className="text-muted d-none d-md-inline">
                Welcome, {userData?.name || "User"}
              </span>
              <button
                className="btn btn-outline-primary btn-sm"
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
              {/* <Route path="*" element={<Navigate to="home" />} /> */}
              <Route path="home" element={<UserHome userData={userData} />} />
              <Route path="browse" element={<BrowseBooks />} />
              <Route
                path="my-books"
                element={<MyBooks userData={userData} />}
              />
              <Route path="borrow-history" element={<BorrowHistory />} />
              <Route
                path="profile"
                element={
                  <MyProfile
                    userData={userData}
                    fetchUserData={fetchUserData}
                  />
                }
              />
              <Route path="book/:id" element={<BookDetails />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
