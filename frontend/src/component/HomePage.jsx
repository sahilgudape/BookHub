import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-3" to="/">
            <i className="bi bi-book-half me-2"></i>
            BookHub
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link btn btn-modern text-white px-3 ms-2"
                  to="/login"
                >
                  {/* <Link
                  className="nav-link btn btn-modern btn-accent text-white px-3 ms-2"
                  to="/login"
                > */}
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link btn btn-modern text-white px-3 ms-2"
                  to="/register"
                >
                  {/* <Link
                  className="nav-link btn btn-modern btn-primary text-white px-3 ms-2"
                  to="/register"
                > */}
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="fade-in">
                <h1 className="display-3 fw-bold mb-4">
                  Welcome to <span className="text-light">BookHub</span>
                </h1>
                <p className="lead mb-5">
                  Experience the future of library management with our modern,
                  intuitive platform. Manage books, users, and categories with
                  ease and elegance.
                </p>
                <div className="d-flex gap-3 flex-wrap">
                  <Link
                    to="/register"
                    className="btn btn-light btn-modern btn-lg"
                  >
                    <i className="bi bi-person-plus me-2"></i>
                    Get Started
                  </Link>
                  <Link
                    to="/about"
                    className="btn btn-outline-light btn-modern btn-lg"
                  >
                    <i className="bi bi-info-circle me-2"></i>
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="floating-animation">
                <div className="text-center">
                  <i className="bi bi-books display-1 opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="content-wrapper">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="fw-bold text-white mb-3">Why Choose BookHub?</h2>
              <p className="text-white-50">
                Discover the features that make us the best choice for library
                management
              </p>
            </div>

            <div className="row g-4">
              <div className="col-md-6 col-lg-3">
                <div className="stats-card primary slide-in">
                  <div className="icon">
                    <i className="bi bi-book"></i>
                  </div>
                  <h4 className="fw-bold">Book Management</h4>
                  <p className="text-muted">
                    Easy book cataloging and inventory management
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div
                  className="stats-card accent slide-in"
                  style={{ animationDelay: "0.1s" }}
                >
                  <div className="icon">
                    <i className="bi bi-people"></i>
                  </div>
                  <h4 className="fw-bold">User Management</h4>
                  <p className="text-muted">
                    Comprehensive user registration and tracking
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div
                  className="stats-card success slide-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="icon">
                    <i className="bi bi-graph-up"></i>
                  </div>
                  <h4 className="fw-bold">Analytics</h4>
                  <p className="text-muted">
                    Detailed insights and reporting capabilities
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div
                  className="stats-card warning slide-in"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="icon">
                    <i className="bi bi-shield-check"></i>
                  </div>
                  <h4 className="fw-bold">Secure</h4>
                  <p className="text-muted">
                    Enterprise-grade security and data protection
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Features */}
            <div className="row mt-5">
              <div className="col-lg-4">
                <div className="modern-card h-100">
                  <div className="text-center mb-3">
                    <i
                      className="bi bi-lightning-charge text-primary"
                      style={{ fontSize: "3rem" }}
                    ></i>
                  </div>
                  <h4 className="fw-bold text-center mb-3">Fast & Efficient</h4>
                  <p className="text-muted text-center">
                    Lightning-fast performance with optimized workflows for
                    maximum productivity.
                  </p>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="modern-card h-100">
                  <div className="text-center mb-3">
                    <i
                      className="bi bi-phone text-success"
                      style={{ fontSize: "3rem" }}
                    ></i>
                  </div>
                  <h4 className="fw-bold text-center mb-3">Mobile Friendly</h4>
                  <p className="text-muted text-center">
                    Fully responsive design that works perfectly on all devices
                    and screen sizes.
                  </p>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="modern-card h-100">
                  <div className="text-center mb-3">
                    <i
                      className="bi bi-heart text-danger"
                      style={{ fontSize: "3rem" }}
                    ></i>
                  </div>
                  <h4 className="fw-bold text-center mb-3">User-Centric</h4>
                  <p className="text-muted text-center">
                    Designed with user experience in mind, making library
                    management a joy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5">
        <div className="container">
          <div className="modern-card text-center">
            <h2 className="fw-bold mb-3">Ready to Transform Your Library?</h2>
            <p className="text-muted mb-4">
              Join thousands of libraries that have revolutionized their
              management with BookHub
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link
                to="/register"
                className="btn btn-modern btn-primary btn-lg"
              >
                <i className="bi bi-rocket-takeoff me-2"></i>
                Start Your Journey
              </Link>
              <Link
                to="/login"
                className="btn btn-modern btn-outline-primary btn-lg"
              >
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
