import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import bookService from "../../service/BookService";

const UpdateBook = () => {
  const { id } = useParams(); // book id from route
  const navigate = useNavigate();
  const [book, setBook] = useState({
    book_title: "",
    author: "",
    publisher: "",
    isbn: "",
    category_name: "",
    total_copies: "",
    available_copies: "",
    status: "",
  });
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");

  // ✅ Fetch book data when component loads
  useEffect(() => {
    bookService
      .getBookById(id)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => {
        console.error(err);
        setMsg("Failed to fetch book details.");
      });
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const imgFile = e.target.files[0];
    setImage(imgFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", book.book_title);
    formData.append("author", book.author);
    formData.append("publisher", book.publisher);
    formData.append("isbn", book.isbn);
    formData.append("category_name", book.category_name);
    formData.append("total_copies", book.total_copies);
    formData.append("available_copies", book.available_copies);
    formData.append("status", book.status);

    if (image) {
      formData.append("image", image);
    } else {
      formData.append("image", book.image); // keep old image
    }

    bookService
      .updatebook(formData, id)
      .then((res) => {
        // setMsg(res.data.message);
        alert("Book updated successfully! ✅");
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
        <h3 className="text-warning">
          <i className="bi bi-pencil-square"></i> UPDATE BOOK
        </h3>
        <p className="text-muted">Modify details of your existing book</p>
      </div>

      <div className="card shadow-lg rounded-3">
        <div
          className="card-header text-white"
          style={{ background: "linear-gradient(135deg, #ff9966, #ff5e62)" }}
        >
          <h5 className="mb-0">
            <i className="bi bi-pencil"></i> Edit Book Details
          </h5>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Book Title *</label>
                <input
                  type="text"
                  name="book_title"
                  value={book.book_title}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Title "
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Author *</label>
                <input
                  type="text"
                  name="author"
                  value={book.author}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter to Updated Author"
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
                  value={book.publisher}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter to updated Publisher"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">ISBN *</label>
                <input
                  type="text"
                  name="isbn"
                  value={book.isbn}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter to updated ISBN"
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Category *</label>
                <input
                  type="text"
                  name="category_name"
                  value={book.category_name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter to updated Category Name"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Total Copies *</label>
                <input
                  type="number"
                  name="total_copies"
                  value={book.total_copies}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter to Update Total Copies"
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Available Copies *</label>
                <input
                  type="number"
                  name="available_copies"
                  value={book.available_copies}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter to Update Available copies"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Status *</label>
                <select
                  name="status"
                  value={book.status}
                  onChange={handleChange}
                  className="form-select"
                  placeholder="Enter to updated status"
                  required
                >
                  <option value="">Select status</option>
                  <option value="available">Available</option>
                  <option value="issued">Issued</option>
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Book Cover Image</label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="form-control"
                accept="image/*"
              />
              {book.image && (
                <div className="mt-2">
                  <p>Current Image:</p>
                  <img
                    src={`http://localhost:3000/${book.image}`}
                    alt="Book Cover"
                    width="120"
                  />
                </div>
              )}
            </div>

            <div className="d-flex justify-content-between">
              <button
                type="submit"
                className="btn text-white"
                style={{
                  background: "linear-gradient(90deg, #ff9966, #ff5e62)",
                }}
              >
                Update Book
              </button>
            </div>

            {msg && <div className="mt-3 alert alert-info">{msg}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBook;
