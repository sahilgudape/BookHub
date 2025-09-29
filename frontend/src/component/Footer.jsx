import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-white text-center text-lg-start mt-5">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <NavLink to="/" className="text-white text-decoration-none">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/services"
                  className="text-white text-decoration-none"
                >
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="text-white text-decoration-none"
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="text-white text-decoration-none"
                >
                  About
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
            <h5 className="fw-bold">Contact</h5>
            <p>Email: abc@gmail.com</p>
            <p>Phone: +91 121-2355-874</p>
          </div>
        </div>
      </div>

      <div className="text-center p-3 bg-secondary">
        © 2025 BookHub | All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;
