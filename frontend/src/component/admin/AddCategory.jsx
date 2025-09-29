import React, { useState } from "react";
import categoryService from "../../service/categoryService";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      setMsg(" ⚠️ Category name is required");
      return;
    }

    const promise = categoryService.createCategory(categoryName);

    promise
      .then((response) => {
        setMsg(response.data.message);
        alert("Category added successfully!");
        navigate("/viewcategory");
      })
      .catch((error) => {
        if (error.response?.status === 400) {
          setMsg("⚠️ Category already exists!");
        } else {
          setMsg(error.response?.data?.message || " ⚠️ Failed to add category");
        }
      });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 rounded-3">
        <div
          className="card-header bg-warning text-white fw-bold"
          style={{ background: "linear-gradient(90deg, #6a11cb, #2575fc)" }}
        >
          {/* ➕ */}
          <i className="bi bi-plus-circle"></i> Add New Category
        </div>
        <div className="card-body">
          {msg && <div className="alert alert-info">{msg}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Category Name *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter category name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Add Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
