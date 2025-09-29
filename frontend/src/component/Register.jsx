import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../service/UserService";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  // 🔹 Validation rules
  const validators = {
    name: (name) => {
      if (!name.trim()) return "Full Name is required.";
      const nameRegex = /^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/;
      if (!nameRegex.test(name.trim())) {
        return "Each word must start with a capital letter and contain only letters.";
      }
      return "";
    },
    email: (email) => {
      if (!email.trim()) return "Email is required.";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) return "Enter a valid email address.";
      return "";
    },
    password: (password) => {
      if (!password) return "Password is required.";
      if (password.length < 6)
        return "Password must be at least 6 characters long.";
      const passRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;
      if (!passRegex.test(password)) {
        return "Password must include lowercase, uppercase, digit, and special character.";
      }
      return "";
    },
    confirmPass: (confirmPass, password) => {
      if (!confirmPass) return "Confirm Password is required.";
      if (confirmPass !== password) return "Passwords do not match.";
      return "";
    },
  };

  const handleChange = (e) => {
    const { name, value: inputValue } = e.target;
    setValue((prev) => ({ ...prev, [name]: inputValue }));

    let error = "";
    if (name === "confirmPass") {
      error = validators.confirmPass(inputValue, value.password);
    } else if (validators[name]) {
      error = validators[name](inputValue);
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateAll = () => {
    const newErrors = {
      name: validators.name(value.name),
      email: validators.email(value.email),
      password: validators.password(value.password),
      confirmPass: validators.confirmPass(value.confirmPass, value.password),
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => !err);
  };

  const submit = () => {
    if (!validateAll()) return;

    setLoading(true);
    UserService.register(value)
      .then((result) => {
        if (result.data.message) {
          setSuccess(true);
          setTimeout(() => navigate("/login"), 2000);
        }
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Something went wrong.");
      })
      .finally(() => setLoading(false));
  };

  if (success) {
    return (
      <div className="register-container">
        <div className="auth-card text-center fade-in">
          <div className="mb-4">
            <i
              className="bi bi-check-circle text-success mb-3"
              style={{ fontSize: "4rem" }}
            ></i>
            <h2 className="fw-bold mb-2 text-success">
              Registration Successful!
            </h2>
            <p className="text-muted">
              Your account has been created successfully.
            </p>
            <p className="text-muted">Redirecting to login page...</p>
          </div>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="register-container">
      <div className="auth-card fade-in">
        <div className="text-center mb-2">
          <i
            className="bi bi-person-plus text-primary mb-3"
            style={{ fontSize: "2rem" }}
          ></i>
          <h3 className="fw-bold mb-2">Create Account</h3>
          <p className="text-muted">Join BookHub and start your journey</p>
        </div>

        <form>
          {/* Full Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-medium">
              <i className="bi bi-person me-2"></i>Full Name
              <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={value.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
            {errors.name && <p className="text-danger small">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-medium">
              <i className="bi bi-envelope me-2"></i>Email Address
              <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={value.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            {errors.email && (
              <p className="text-danger small">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-medium">
              <i className="bi bi-lock me-2"></i>Password
              <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                name="password"
                value={value.password}
                onChange={handleChange}
                placeholder="Create password"
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
            {errors.password && (
              <p className="text-danger small">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label htmlFor="confirmPass" className="form-label fw-medium">
              <i className="bi bi-lock-fill me-2"></i>Confirm Password
              <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                id="confirmPass"
                name="confirmPass"
                value={value.confirmPass}
                onChange={handleChange}
                placeholder="Confirm password"
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <i
                  className={`bi ${
                    showConfirmPassword ? "bi-eye-slash" : "bi-eye"
                  }`}
                ></i>
              </button>
            </div>
            {errors.confirmPass && (
              <p className="text-danger small">{errors.confirmPass}</p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="button"
            className="btn btn-modern btn-primary w-100 mb-3"
            onClick={submit}
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                Creating Account...
              </>
            ) : (
              <>
                <i className="bi bi-person-plus me-2"></i>
                Create Account
              </>
            )}
          </button>

          <div className="text-center">
            <span className="text-muted">Already have an account? </span>
            <Link
              to="/login"
              className="text-primary text-decoration-none fw-medium"
            >
              Sign In
            </Link>
          </div>
        </form>

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

export default Register;
