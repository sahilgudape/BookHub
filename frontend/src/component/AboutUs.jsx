import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const features = [
    {
      icon: "bi-bullseye",
      title: "Our Mission",
      description:
        "Empowering libraries with technology that saves time and enhances accessibility. We aim to bridge the gap between traditional library services and modern digital expectations.",
    },
    {
      icon: "bi-people",
      title: "Who We Serve",
      description:
        "Students, librarians, and institutions who want a seamless digital library experience. We simplify operations and make knowledge more accessible to everyone.",
    },
    {
      icon: "bi-box-seam",
      title: "What We Offer",
      description:
        "Easy search, efficient book management, secure role-based access, and powerful analytics – everything needed to modernize your library.",
    },
  ];

  return (
    <div className="about-page">
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
                <Link className="nav-link active" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link btn btn-modern btn-accent text-white px-3 ms-2"
                  to="/login"
                >
                  Login
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
                <h1 className="display-4 fw-bold mb-4">
                  About <span className="text-light">BookHub</span>
                </h1>
                <p className="lead mb-4">
                  Welcome to <span className="fw-bold">BookHub</span> – Your
                  Digital Library Companion. We simplify operations, making book
                  search, issue, and management smarter and faster.
                </p>
                <div className="d-flex gap-3">
                  <Link to="/register" className="btn btn-light btn-modern">
                    Get Started Today
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-center">
                <i className="bi bi-book display-1 opacity-75"></i>
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
                Powerful features designed to enhance your library experience
              </p>
            </div>

            <div className="row g-4">
              {features.map((feature, index) => (
                <div key={index} className="col-md-4">
                  <div className="modern-card h-100 text-center">
                    <div className="mb-3">
                      <div className="p-3 bg-primary bg-opacity-10 rounded-circle d-inline-flex">
                        <i
                          className={`bi ${feature.icon} fs-3 text-primary`}
                        ></i>
                      </div>
                    </div>
                    <h5 className="fw-bold mb-3">{feature.title}</h5>
                    <p className="text-muted mb-0">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-5">
        <div className="container">
          <div className="modern-card">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h3 className="fw-bold mb-3">
                  Ready to Transform Your Library?
                </h3>
                <p className="text-muted mb-0">
                  Join libraries worldwide that trust BookHub to modernize their
                  management system and deliver a seamless experience.
                </p>
              </div>
              <div className="col-lg-4 text-lg-end">
                <div className="d-flex gap-3 flex-wrap justify-content-lg-end">
                  <Link to="/register" className="btn btn-primary btn-modern">
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    className="btn btn-outline-primary btn-modern"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4">
        <div className="container">
          <div className="text-center text-white-50">
            <p>&copy; 2024 BookHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
