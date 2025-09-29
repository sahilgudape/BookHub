import React, { useState } from "react";
import UserService from "../../service/UserService";

const MyProfile = ({ userData, fetchUserData }) => {
  const [formData, setFormData] = useState({
    user_id: userData?.user_id || "", // ✅ include user_id
    name: userData?.name || "",
    email: userData?.email || "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    UserService.updateUser(formData)
      .then((res) => {
        setMessage("Profile updated successfully!");
        fetchUserData(); // Refresh user data
      })
      .catch((err) => {
        setMessage(err.response?.data?.message || "Failed to update profile");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="fw-bold mb-4">My Profile</h2>

              {message && (
                <div
                  className={`alert ${
                    message.includes("successfully")
                      ? "alert-success"
                      : "alert-danger"
                  } alert-dismissible fade show`}
                >
                  {message}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setMessage("")}
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-medium">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end pt-3 border-top">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Updating...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>Update
                        Profile
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="fw-bold mb-3 text-primary">
                <i className="bi bi-info-circle me-2"></i>Profile Information
              </h6>
              <div className="mb-3">
                <small className="text-muted">Member Since</small>
                <p className="mb-0">
                  {userData?.created_at
                    ? new Date(userData.created_at).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <div className="mb-3">
                <small className="text-muted">User ID</small>
                <p className="mb-0">{userData?.user_id || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
