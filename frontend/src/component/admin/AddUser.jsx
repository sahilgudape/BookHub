import React, { useState } from "react";
import AdminService from "../../service/AdminService";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const navigate = useNavigate();

  const [fdata, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    status: "active",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);

    AdminService.addUser(fdata)
      .then((result) => {
        if (result.data.message) {
          setMsg(result.data.message);
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setMsg(err.response.data.message);
        } else {
          setMsg("Something went wrong: " + err.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="col d-flex justify-content-center align-items-start p-4">
      <div className="w-100" style={{ maxWidth: "600px" }}>
        <div className="card shadow-lg border-0 rounded-4 p-4">
          <h3 className="text-center fw-bold mb-4">Add New User</h3>
          {msg && (
            <div
              className={`alert ${
                msg.includes("successfully") ? "alert-success" : "alert-danger"
              }`}
            >
              {msg}
            </div>
          )}

          <form onSubmit={submit}>
            {/* Name */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={fdata.name}
                className="form-control form-control-lg rounded-3 shadow-sm"
                placeholder="Enter full name"
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={fdata.email}
                className="form-control form-control-lg rounded-3 shadow-sm"
                placeholder="Enter email address"
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                name="password"
                value={fdata.password}
                className="form-control form-control-lg rounded-3 shadow-sm"
                placeholder="Enter password"
                onChange={handleChange}
                required
              />
            </div>

            {/* Role */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Role</label>
              <select
                name="role"
                value={fdata.role}
                className="form-select form-select-lg rounded-3 shadow-sm"
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Status */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Status</label>
              <select
                name="status"
                value={fdata.status}
                className="form-select form-select-lg rounded-3 shadow-sm"
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Submit */}
            <div className="d-flex justify-content-between mt-4">
              <button
                type="submit"
                className="btn btn-primary px-4"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add User"}
              </button>
              <button
                type="button"
                className="btn btn-secondary px-4"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
