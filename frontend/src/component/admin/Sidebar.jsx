import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, onToggle, onLogout }) => {
  const [openSections, setOpenSections] = useState({
    books: true,
    users: false,
    categories: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const menuItems = [
    {
      path: "/admin/dashboard",
      icon: "bi-speedometer2",
      label: "Dashboard",
      type: "single",
    },
    {
      type: "section",
      key: "books",
      icon: "bi-book",
      label: "Manage Books",
      items: [
        {
          path: "/admin/books",
          icon: "bi-list-ul",
          label: "View All Books",
        },
        {
          path: "/admin/books/add",
          icon: "bi-plus-circle",
          label: "Add New Book",
        },
      ],
    },
    {
      type: "section",
      key: "users",
      icon: "bi-people",
      label: "Manage Users",
      items: [
        {
          path: "/admin/users",
          icon: "bi-list-ul",
          label: "View All Users",
        },
        {
          path: "/admin/users/add",
          icon: "bi-person-plus",
          label: "Add New User",
        },
      ],
    },
    {
      type: "section",
      key: "categories",
      icon: "bi-tags",
      label: "Manage Categories",
      items: [
        {
          path: "/admin/categories",
          icon: "bi-list-ul",
          label: "View Categories",
        },
      ],
    },
  ];

  const renderMenuItem = (item, index) => {
    if (item.type === "single") {
      return (
        <NavLink
          key={index}
          to={item.path}
          className={({ isActive }) =>
            `nav-link d-flex align-items-center py-3 px-3 ${
              isActive ? "bg-primary text-white" : "text-white-50 hover-bg"
            }`
          }
          onClick={onToggle}
        >
          <i className={`${item.icon} me-3`}></i>
          <span className="fw-medium">{item.label}</span>
        </NavLink>
      );
    }

    if (item.type === "section") {
      return (
        <div key={index} className="mb-1">
          <button
            className="nav-link btn btn-link text-start p-0 border-0 text-white w-100 d-flex justify-content-between align-items-center py-3 px-3"
            onClick={() => toggleSection(item.key)}
          >
            <span className="d-flex align-items-center">
              <i className={`${item.icon} me-3`}></i>
              <span className="fw-medium">{item.label}</span>
            </span>
            <i
              className={`bi ${
                openSections[item.key] ? "bi-chevron-down" : "bi-chevron-right"
              }`}
            ></i>
          </button>

          {openSections[item.key] && (
            <div className="ms-4">
              {item.items.map((subItem, subIndex) => (
                <NavLink
                  key={subIndex}
                  to={subItem.path}
                  className={({ isActive }) =>
                    `nav-link d-flex align-items-center py-2 px-3 text-white-50 ${
                      isActive ? "active-submenu" : "hover-bg"
                    }`
                  }
                  onClick={onToggle}
                >
                  <i className={`${subItem.icon} me-3`}></i>
                  <span className="small">{subItem.label}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="sidebar h-100% bg-dark" style={{ width: "280px" }}>
      {/* Logo Header */}
      <div className="text-center p-4 border-bottom border-secondary">
        <Link to="/admin/dashboard" className="text-decoration-none">
          <i className="bi bi-book-half fs-1 text-primary mb-2 d-block"></i>
          <h5 className="text-white fw-bold mb-1">BookHub</h5>
          <small className="text-white-50">Admin Panel</small>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="nav flex-column py-3">
        {menuItems.map((item, index) => renderMenuItem(item, index))}
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto p-3 border-top border-secondary">
        <Link
          to="/"
          className="nav-link d-flex align-items-center text-white-50 py-2 px-3 hover-bg"
        >
          <i className="bi bi-house me-3"></i>
          <span>Home</span>
        </Link>

        <button
          className="nav-link btn btn-link text-start p-0 border-0 text-white-50 w-100 d-flex align-items-center py-2 px-3 hover-bg"
          onClick={onLogout}
        >
          <i className="bi bi-box-arrow-right me-3"></i>
          <span>Logout</span>
        </button>
      </div>

      {/* Add this CSS */}
      <style jsx>{`
        .hover-bg:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
          color: white !important;
        }
        .active-submenu {
          background-color: rgba(13, 110, 253, 0.2) !important;
          color: white !important;
          border-left: 3px solid #0d6efd;
        }
        .sidebar {
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
