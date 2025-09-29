import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../service/UserService.jsx"; // axios instance

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const result = await UserService.login(formData);
      if (result.status === 200) {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("role", result.data.user.role);
        localStorage.setItem("user", JSON.stringify(result.data.user));

        if (result.data.user.role.trim().toLowerCase() === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/home");
        }
      }
    } catch (err) {
      if (err.response) {
        setMsg(err.response.data.message);
      } else if (err.request) {
        setMsg(
          "Something went wrong or server not responding. Please try again."
        );
      } else {
        setMsg(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="auth-card fade-in">
        <div className="text-center mb-4">
          <i
            className="bi bi-book-half text-primary mb-3"
            style={{ fontSize: "3rem" }}
          ></i>
          <h2 className="fw-bold mb-2">Welcome Back</h2>
          <p className="text-muted">Sign in to access your library account</p>
        </div>

        {msg && (
          <div className="alert alert-danger" role="alert">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-medium">
              <i className="bi bi-envelope me-2"></i>Email Address{" "}
              <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-medium">
              <i className="bi bi-lock me-2"></i>Password{" "}
              <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                ></i>
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-modern btn-primary w-100 mb-3"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                Signing In...
              </>
            ) : (
              <>
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Sign In
              </>
            )}
          </button>

          {/* Forgot Password */}
          <div className="text-center mb-3">
            <Link
              to="/forgot-password"
              className="text-decoration-none text-primary fw-medium"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="text-center">
            <span className="text-muted">Don't have an account? </span>
            <Link
              to="/register"
              className="text-primary text-decoration-none fw-medium"
            >
              Create Account
            </Link>
          </div>
        </form>

        <hr className="my-4" />

        <div className="text-center mt-3">
          <Link to="/" className="btn btn-outline-secondary btn-sm">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
