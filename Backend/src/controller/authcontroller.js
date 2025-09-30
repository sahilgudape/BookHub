const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authmod = require("../models/authModel.js");
const userMod = require("../models/userModel.js");

// ================== REGISTER ==================
exports.register = async (req, res) => {
  try {
    const { name, email, password, confirmPass, role } = req.body;

    if (!name || !email || !password || !confirmPass) {
      return res.status(400).json({ message: "All fields are mandatory...!" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    if (password !== confirmPass) {
      return res
        .status(400)
        .json({ message: "Password and Confirm password don't match" });
    }

    // Check if user exists
    const existingUser = await authmod.getUserByEmail(email);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // const userRole = role && role.toLowerCase() === "admin" ? "admin" : "user";
    let userRole = "user"; // default role for frontend registration
    if (role && role.toLowerCase() === "admin") {
      userRole = "admin"; // only allowed if passed via Postman
    }
    // Save user
    const result = await authmod.register(
      name,
      email,
      hashedPassword,
      userRole
    );

    return res.status(201).json({
      message: "User registered successfully..!",
      user: { id: result.insertId, name, email, role: userRole },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//=============================== LOGIN ===============================

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const result = await authmod.getUserByEmail(email);

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const user = result[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    // Create JWT
    const token = jwt.sign(
      { id: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: (process.env.COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000, // days → ms
      secure: false, // set true in production with HTTPS
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "Login successful",
      // role: user.role,
      user: {
        id: user.user_id,
        name: user.user_name,
        email: user.user_email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// ================== LOGOUT ==================
exports.logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      message: "Logged out successfully",
    });
};

//=======================Update Password==================================

exports.updatePassword = (req, res) => {
  const { currentPass, newPass, conPass } = req.body;

  if (!currentPass || !newPass || !conPass) {
    return res.status(400).json({ message: "All the fields are required" });
  }

  if (currentPass !== req.user.password) {
    return res.status(400).json({ message: "Current password is incorrect" });
  }

  if (newPass.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  if (newPass !== conPass) {
    return res
      .status(400)
      .json({ message: "New password and confirm password do not match" });
  }

  const promise = userMod.updatepassword(newPass, req.user.id);

  promise
    .then((result) => {
      return res
        .status(200)
        .json({ message: "Password updated successfully...!" });
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
};
