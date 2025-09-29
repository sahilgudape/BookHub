import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bookService from "../../service/BookService";

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publisher: "",
    isbn: "",
    category_name: "",
    total_copies: "",
    available_copies: "",
    status: "",
  });
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const imgFile = e.target.files[0];
    if (imgFile) {
      setFile(imgFile);
    }
  };

  const handleReset = () => {
    setFormData({
      title: "",
      author: "",
      publisher: "",
      isbn: "",
      category_name: "",
      total_copies: "",
      available_copies: "",
      status: "",
    });
    setFile(null);
    setMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a book cover image...");
      return;
    }

    setLoading(true);
    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      submitData.append(key, formData[key]);
    });
    submitData.append("image", file);

    bookService
      .createBook(submitData)
      .then((res) => {
        setMsg(res.data.message);
        setSuccess(true);
        setTimeout(() => {
          handleReset();
          setSuccess(false);
          navigate("/admin/books");
        }, 2000);
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.message || err.message;
        setMsg(errorMsg);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <div>
          <h2 className="fw-bold mb-2">Add New Book</h2>
          <p className="text-muted mb-0">
            Fill in the details to add a new book to the library.
          </p>
        </div>
      </div>

      {success && (
        <div className="alert alert-success" role="alert">
          <i className="bi bi-check-circle me-2"></i>
          Book added successfully! Redirecting to books list...
        </div>
      )}

      {msg && !success && (
        <div
          className="alert alert-info alert-dismissible fade show"
          role="alert"
        >
          {msg}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMsg("")}
          ></button>
        </div>
      )}

      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-medium">
                      <i className="bi bi-book me-2"></i>Book Title{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter book title"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-medium">
                      <i className="bi bi-person me-2"></i>Author{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      placeholder="Enter author name"
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-medium">
                      <i className="bi bi-building me-2"></i>Publisher
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="publisher"
                      value={formData.publisher}
                      onChange={handleChange}
                      placeholder="Enter publisher name"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-medium">
                      <i className="bi bi-upc me-2"></i>ISBN{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="isbn"
                      value={formData.isbn}
                      onChange={handleChange}
                      placeholder="Enter ISBN number"
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-medium">
                      <i className="bi bi-tags me-2"></i>Category{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="category_name"
                      value={formData.category_name}
                      onChange={handleChange}
                      placeholder="Enter category"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-medium">
                      <i className="bi bi-stack me-2"></i>Total Copies{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="total_copies"
                      value={formData.total_copies}
                      onChange={handleChange}
                      placeholder="Enter number of copies"
                      required
                      min="1"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-medium">
                      <i className="bi bi-collection me-2"></i>Available Copies
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="available_copies"
                      value={formData.available_copies}
                      onChange={handleChange}
                      placeholder="Enter available copies"
                      required
                      min="0"
                      max={formData.total_copies}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-medium">
                      <i className="bi bi-check-circle me-2"></i>Status{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select status</option>
                      <option value="Available">Available</option>
                      <option value="Issued">Issued</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-medium">
                    <i className="bi bi-image me-2"></i>Book Cover Image{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                  <div className="form-text">
                    Supported formats: JPG, PNG, JPEG. Max size: 2MB
                  </div>
                </div>

                <div className="d-flex gap-3 justify-content-end pt-3 border-top">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleReset}
                  >
                    <i className="bi bi-arrow-repeat me-2"></i>Reset
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/admin/books")}
                  >
                    <i className="bi bi-arrow-left me-2"></i>Back to Books
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Adding...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-plus-circle me-2"></i>Add Book
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Sidebar Info */}
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="fw-bold mb-3 text-primary">
                <i className="bi bi-info-circle me-2"></i>Book Guidelines
              </h6>
              <ul className="list-unstyled small">
                <li className="mb-2">
                  <i className="bi bi-check2 text-success me-2"></i>
                  Ensure book title & author are correct
                </li>
                <li className="mb-2">
                  <i className="bi bi-check2 text-success me-2"></i>
                  Select appropriate category
                </li>
                <li className="mb-2">
                  <i className="bi bi-check2 text-success me-2"></i>
                  Upload a clear cover image
                </li>
                <li className="mb-2">
                  <i className="bi bi-check2 text-success me-2"></i>
                  Provide total & available copies
                </li>
                <li className="mb-2">
                  <i className="bi bi-check2 text-success me-2"></i>
                  Available copies cannot exceed total copies
                </li>
                <li className="mb-2">
                  <i className="bi bi-check2 text-success me-2"></i>
                  ISBN should be unique for each book
                </li>
              </ul>

              {file && (
                <div className="mt-4">
                  <h6 className="fw-bold mb-2">Image Preview</h6>
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Book cover preview"
                    className="img-fluid rounded shadow-sm"
                    style={{ maxHeight: "200px" }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
