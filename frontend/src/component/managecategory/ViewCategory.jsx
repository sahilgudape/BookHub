import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import categoryService from "../../service/categoryService";

const ViewCategory = () => {
  const [categories, setCategories] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    categoryService
      .getAllCategory()
      .then((res) => {
        setCategories(res.data.result);
      })
      .catch((err) => {
        setMsg("⚠️ Failed to load categories");
        console.log("ViewCategory.jsx error is --> " + err);
      });
  };

  // ✅ Delete handler with confirm alert
  const handleDelete = (id, name) => {
    if (
      window.confirm(`Are you sure you want to delete category "${name}" ?`)
    ) {
      categoryService
        .deleteCategory(id)
        .then(() => {
          alert(`🗑 Category "${name}" deleted successfully`);
          loadCategories();
        })
        .catch((err) => {
          setMsg("❌ Failed to delete category");
          console.log("Delete error -->", err);
        });
    }
  };

  // ✅ Update handler with prompt
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

  // ✅ Add handler with prompt
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

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-primary">📂 Category Management</h3>
        <button onClick={handleAdd} className="btn btn-success shadow-sm">
          ➕ Add Category
        </button>
      </div>

      {/* Error Message */}
      {msg && <div className="alert alert-danger">{msg}</div>}

      {/* Category Table */}
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-bordered align-middle">
          <thead className="table-dark text-center">
            <tr>
              <th style={{ width: "15%" }}>ID</th>
              <th style={{ width: "25%" }}>Category Name</th>
              <th style={{ width: "20%" }}>Delete</th>
              <th style={{ width: "20%" }}>Update</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {categories.length > 0 ? (
              categories.map((c) => (
                <tr key={c.category_id}>
                  <td className="fw-semibold">{c.category_id}</td>
                  <td>{c.category_name}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleDelete(c.category_id, c.category_name)
                      }
                      className="btn btn-danger btn-sm px-3"
                    >
                      🗑 Delete
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        handleUpdate(c.category_id, c.category_name)
                      }
                      className="btn btn-warning btn-sm px-3"
                    >
                      ✏️ UPDATE
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-muted py-4">
                  🚫 No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCategory;
