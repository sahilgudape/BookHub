import React, { useEffect, useState } from "react";
import AdminService from "../../service/AdminService";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    user_name: "",
    user_email: "",
    password: "", // For password reset (optional)
    role: "user",
  });

  const [msg, setMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const [resetPassword, setResetPassword] = useState(false);

  // UpdateUser.jsx - Modified error handling
  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const result = await AdminService.getUserById(id);
        if (
          isMounted &&
          result.data &&
          result.data.data &&
          result.data.data[0]
        ) {
          const user = result.data.data[0];
          setUserData({
            user_name: user.user_name || "",
            user_email: user.user_email || "",
            password: "",
            role: user.role || "user",
          });
          setMsg("");
        }
      } catch (err) {
        if (isMounted) {
          console.error("API Error:", err);

          // More specific error handling
          if (err.response && err.response.status === 404) {
            setMsg(
              `Error: User with ID ${id} not found. Please check if the user exists.`
            );
          } else if (
            err.code === "NETWORK_ERROR" ||
            err.message === "Network Error"
          ) {
            setMsg(
              "Error: Cannot connect to the server. Please make sure the backend is running."
            );
          } else if (err.response && err.response.data) {
            setMsg(`Error: ${err.response.data.message}`);
          } else {
            setMsg("Error: Something went wrong while fetching user data.");
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submitData = {
      name: userData.user_name,
      email: userData.user_email,
      role: userData.role,
    };

    if (resetPassword && userData.password) {
      submitData.password = userData.password;
    }

    try {
      const result = await AdminService.updateUser(id, submitData);
      if (result.data.message) {
        setMsg(result.data.message);
        setTimeout(() => {
          navigate("/admin/users");
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

  // Show loading state
  if (isLoading) {
    return (
      <div className="col d-flex justify-content-center align-items-center p-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="col d-flex justify-content-center align-items-start p-4">
      <div className="w-100" style={{ maxWidth: "600px" }}>
        <div className="card shadow-lg border-0 rounded-4 p-4">
          <h3 className="text-center fw-bold mb-4">Update User</h3>

          {msg && (
            <div
              className={`alert ${
                msg.includes("successfully") || !msg.includes("not found")
                  ? "alert-success"
                  : "alert-danger"
              }`}
            >
              {msg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* User Name */}
            <div className="mb-3">
              <label className="form-label fw-semibold">User Name</label>
              <input
                type="text"
                name="user_name"
                value={userData.user_name}
                className="form-control form-control-lg rounded-3 shadow-sm"
                placeholder="Enter user name"
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                name="user_email"
                value={userData.user_email}
                className="form-control form-control-lg rounded-3 shadow-sm"
                placeholder="Enter email address"
                onChange={handleChange}
                required
              />
            </div>

            {/* Role */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Role</label>
              <select
                name="role"
                value={userData.role}
                className="form-select form-select-lg rounded-3 shadow-sm"
                onChange={handleChange}
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Password Reset */}
            <div className="mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="resetPassword"
                  checked={resetPassword}
                  onChange={(e) => setResetPassword(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="resetPassword">
                  Reset Password
                </label>
              </div>
            </div>

            {/* Password (only show if reset is enabled) */}
            {resetPassword && (
              <div className="mb-3">
                <label className="form-label fw-semibold">New Password</label>
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  className="form-control form-control-lg rounded-3 shadow-sm"
                  placeholder="Enter new password"
                  onChange={handleChange}
                  required={resetPassword}
                />
                <div className="form-text">
                  Leave blank to keep current password
                </div>
              </div>
            )}

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
                  "Update User"
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

export default UpdateUser;
