import axios from "axios";

class UserService {
  // 🔑 Login
  login(user) {
    return axios.post("http://localhost:3000/auth/login", user, {
      withCredentials: true,
    });
  }

  // 🆕 Register
  register(user) {
    const { name, email, password, confirmPass } = user;
    return axios.post("http://localhost:3000/auth/register", {
      name,
      email,
      password,
      confirmPass,
    });
  }

  // 👤 Get current user profile
  // getUser() {
  //   return axios.get("http://localhost:3000/user/profile", {
  //     withCredentials: true,
  //   });
  // }

  getProfile() {
    return axios.get("http://localhost:3000/user/profile", {
      withCredentials: true, // required
    });
  }

  // 🚪 Logout
  logout() {
    return axios.get("http://localhost:3000/auth/logout", {
      withCredentials: true,
    });
  }

  // ✏️ Update user profile
  updateUser(formData) {
    return axios.put("http://localhost:3000/user/profile", formData, {
      withCredentials: true,
    });
  }

  // 🔒 Update password
  updatePassword(values) {
    return axios.put("http://localhost:3000/user/password", values, {
      withCredentials: true,
    });
  }

  // 📚 User-related book APIs
  getIssuedBooks() {
    return axios.get("http://localhost:3000/user/issued-books", {
      withCredentials: true,
    });
  }

  getReturnedBooks() {
    return axios.get("http://localhost:3000/user/returned-books", {
      withCredentials: true,
    });
  }
  getMyBorrowedBooks() {
    return axios.get("http://localhost:3000/user/my-books", {
      withCredentials: true,
    });
  }

  getBorrowHistory() {
    return axios.get("http://localhost:3000/user/issued-books", {
      withCredentials: true,
    });
  }

  // 📊 Dashboard stats
  getDashboardStats() {
    return axios.get("http://localhost:3000/user/dashboard-stats", {
      withCredentials: true,
    });
  }

  // 🔍 Browse/search books (user scope)
  getAllBooks() {
    return axios.get("http://localhost:3000/user/books", {
      withCredentials: true,
    });
  }

  searchBooks(query) {
    return axios.get(`http://localhost:3000/user/books/search?q=${query}`, {
      withCredentials: true,
    });
  }
}

export default new UserService();
