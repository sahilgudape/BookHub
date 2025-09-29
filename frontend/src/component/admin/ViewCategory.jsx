import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import categoryService from "../../service/categoryService";

const ViewCategory = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [msg, setMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    categoryService
      .getAllCategory()
      .then((res) => {
        const categoriesData = res.data.result || [];
        setCategories(categoriesData);
        setFilteredCategories(categoriesData);
      })
      .catch((err) => {
        setMsg("⚠️ Failed to load categories");
        console.log("ViewCategory.jsx error is --> " + err);
      });
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter((category) =>
        category.category_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
    setCurrentPage(1);
  };

  const handleClear = () => {
    setSearchTerm("");
    setFilteredCategories(categories);
    setCurrentPage(1);
  };

  const handleDelete = async (categoryId, categoryName) => {
    if (
      window.confirm(
        `Are you sure you want to delete category "${categoryName}"?`
      )
    ) {
      try {
        await categoryService.deleteCategory(categoryId);
        alert(`✅ Category "${categoryName}" deleted successfully`);
        loadCategories();
      } catch (err) {
        console.error("Delete failed:", err);
        alert(`❌ Delete failed: ${err.message}`);
      }
    }
  };

  const handleUpdate = (id, oldName) => {
    const newName = window.prompt(`Update category "${oldName}"`, oldName);
    if (newName && newName.trim() !== "" && newName !== oldName) {
      categoryService
        .updateCategory(id, newName)
        .then(() => {
          alert(`✏️ Category updated to "${newName}" successfully`);
          loadCategories();
        })
        .catch((err) => {
          setMsg("❌ Failed to update category");
          console.log("Update error -->", err);
        });
    }
  };

  const handleAdd = () => {
    const name = window.prompt("Enter new category name:");
    if (name && name.trim() !== "") {
      categoryService
        .createCategory(name)
        .then(() => {
          alert(`✅ Category "${name}" added successfully`);
          loadCategories();
        })
        .catch((err) => {
          setMsg("❌ Failed to add category");
          console.log("Add error -->", err);
        });
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = filteredCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <div>
          <h2 className="fw-bold mb-2">Category Management</h2>
          <p className="text-muted mb-0">
            Manage book categories and classifications
          </p>
        </div>
        <button onClick={handleAdd} className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>Add Category
        </button>
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
              placeholder="Search categories by name..."
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
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredCategories.length)} of{" "}
            {filteredCategories.length} categories
          </span>
        </div>
      </div>

      {msg && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <i className="bi bi-exclamation-triangle me-2"></i>
          {msg}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMsg("")}
          ></button>
        </div>
      )}

      {/* Categories Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>SL No.</th>
                  {/* <th>ID</th> */}
                  <th>Category Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentCategories.length > 0 ? (
                  currentCategories.map((category, index) => (
                    <tr key={category.category_id}>
                      <td>
                        <span className="text-muted fw-medium">
                          {indexOfFirstItem + index + 1}
                        </span>
                      </td>
                      {/* <td>
                        <span className="badge bg-secondary">
                          {category.category_id}
                        </span>
                      </td> */}
                      <td>
                        <h6 className="mb-0 fw-medium">
                          {category.category_name}
                        </h6>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            onClick={() =>
                              handleUpdate(
                                category.category_id,
                                category.category_name
                              )
                            }
                            className="btn btn-outline-primary btn-sm"
                          >
                            <i className="bi bi-pencil me-1"></i>Edit
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(
                                category.category_id,
                                category.category_name
                              )
                            }
                            className="btn btn-outline-danger btn-sm"
                          >
                            <i className="bi bi-trash me-1"></i>Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-5">
                      <i className="bi bi-tags display-4 d-block mb-2"></i>
                      {searchTerm
                        ? "No categories match your search"
                        : "No categories found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="d-flex justify-content-center mt-4">
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
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
                    disabled={currentPage === totalPages}
                  >
                    Next
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

export default ViewCategory;
