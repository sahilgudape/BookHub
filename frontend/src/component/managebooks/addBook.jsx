import { useState } from "react";
import bookService from "../../service/BookService";
import { useNavigate } from "react-router-dom";

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
  const [msg, setMsg] = useState("");
  const [file, setFile] = useState(null);
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

  const sendToBackend = (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select your image...");
      return;
    }

    const submitData = new FormData();

    // Append all text fields
    Object.keys(formData).forEach((key) => {
      submitData.append(key, formData[key]);
    });

    // Append file under correct key
    submitData.append("image", file);

    const promise = bookService.createBook(submitData);

    promise
      .then((res) => {
        setMsg(res.data.message);
        alert("Book added successfully!");
        handleReset();
        navigate("/getAllbook");
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.message || err.message;
        setMsg(errorMsg);
      });
  };

  return (
    <div className="container mt-3">
      <div className="text-center mb-3">
        <h4 className="text-primary">
          <i className="bi bi-book"></i> BookHub
        </h4>
        <p className="text-muted">Add new books to your library collection</p>
      </div>

      <div className="card shadow-lg rounded-3">
        <div
          className="card-header text-white"
          style={{ background: "linear-gradient(90deg, #6a11cb, #2575fc)" }}
        >
          <h5 className="mb-0">
            <i className="bi bi-plus-circle"></i> Add New Book
          </h5>
        </div>

        <div className="card-body">
          <form onSubmit={sendToBackend}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Book Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter book title"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Author *</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter author name"
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Publisher</label>
                <input
                  type="text"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter publisher name"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">ISBN *</label>
                <input
                  type="text"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter ISBN number"
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Category *</label>
                <input
                  type="text"
                  name="category_name" // Changed from "category"
                  value={formData.category_name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter category name"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Total Copies *</label>
                <input
                  type="number"
                  name="total_copies" // Changed from "totalCopies"
                  value={formData.total_copies}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter number of copies"
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Available Copies *</label>
                <input
                  type="number"
                  name="available_copies" // Changed from "availableCopies"
                  value={formData.available_copies}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter available copies"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Status *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select status</option>
                  <option value="Available">Available</option>
                  <option value="Issued">Issued</option>
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Book Cover Image</label>
              <input
                type="file"
                name="coverUrl"
                onChange={handleFileChange}
                className="form-control"
                accept="image/*"
              />
            </div>

            <div className="d-flex justify-content-between">
              <button
                type="button"
                onClick={handleReset}
                className="btn btn-outline-secondary"
              >
                <i className="bi bi-arrow-counterclockwise"></i> Reset Form
              </button>

              <button
                type="submit"
                className="btn text-white"
                style={{
                  background: "linear-gradient(90deg, #6a11cb, #2575fc)",
                }}
              >
                Add New Book
              </button>
            </div>
            {msg && <div className="mt-3 alert alert-info">{msg}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
