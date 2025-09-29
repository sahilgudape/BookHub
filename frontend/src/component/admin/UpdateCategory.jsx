import React, { useEffect, useState } from "react";
import AdminService from "../../service/AdminService";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchCategory = async () => {
      try {
        const result = await AdminService.getCategoryById(id);
        if (
          isMounted &&
          result.data &&
          result.data.data &&
          result.data.data[0]
        ) {
          const category = result.data.data[0];
          setCategoryData({
            name: category.name || "",
            description: category.description || "",
          });
          setMsg("");
        }
      } catch (err) {
        if (isMounted) {
          if (err.response && err.response.data) {
            setMsg(err.response.data.message);
          } else {
            setMsg("Something went wrong: " + err.message);
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCategory();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await AdminService.updateCategory(id, categoryData);
      if (result.data.message) {
        setMsg(result.data.message);
        setTimeout(() => {
          navigate("/admin/categories");
        }, 2000);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setMsg(err.response.data.message);
      } else {
        setMsg("Something went wrong: " + err.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="col d-flex justify-content-center align-items-center p-4">
        <Loader />
      </div>
    );
  }

  return (
    <div className="col d-flex justify-content-center align-items-start p-4">
      <div className="w-100" style={{ maxWidth: "600px" }}>
        <div className="card shadow-lg border-0 rounded-4 p-4">
          <h3 className="text-center fw-bold mb-4">Update Category</h3>

          {msg && (
            <div
              className={`alert ${
                msg.includes("successfully") ? "alert-success" : "alert-danger"
              }`}
            >
              {msg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Category Name */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Category Name</label>
              <input
                type="text"
                name="name"
                value={categoryData.name}
                className="form-control form-control-lg rounded-3 shadow-sm"
                placeholder="Enter category name"
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Description</label>
              <textarea
                name="description"
                value={categoryData.description}
                className="form-control form-control-lg rounded-3 shadow-sm"
                rows="3"
                placeholder="Enter category description"
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Submit Buttons */}
            <div className="d-flex justify-content-between mt-4">
              <button
                type="submit"
                className="btn btn-primary px-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Updating...
                  </>
                ) : (
                  "Update Category"
                )}
              </button>
              <button
                type="button"
                className="btn btn-secondary px-4"
                onClick={() => navigate(-1)}
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
