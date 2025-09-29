import axios from "axios";

class AdminService {
  //========================================User Services=========================
  addUser(userData) {
    let promise = axios.post("http://localhost:3000/admin/users", userData, {
      withCredentials: true,
    });
    return promise;
  }
  getAllUsers() {
    let promise = axios.get("http://localhost:3000/admin/users", {
      withCredentials: true,
    });
    return promise;
  }

  getUserById(id) {
    let promise = axios.get(`http://localhost:3000/admin/users/${id}`, {
      withCredentials: true,
    });
    return promise;
  }

  updateUser(id, userData) {
    let promise = axios.put(
      `http://localhost:3000/admin/users/${id}`,
      userData,
      {
        withCredentials: true,
      }
    );
    return promise;
  }
  deleteUser(id) {
    return axios.delete(`http://localhost:3000/admin/users/${id}`, {
      withCredentials: true,
    });
  }

  //====================================Category Services===========================
  addCategory(category) {
    let promise = axios.post(
      "http://localhost:3000/admin/categories",
      category,
      { withCredentials: true }
    );
    return promise;
  }
  getAllCategories() {
    let promise = axios.get("http://localhost:3000/admin/categories", {
      withCredentials: true,
    });
    return promise;
  }
  updateCategories(category) {
    let promise = axios.put(
      "http://localhost:3000/admin/updatecategory",
      category,
      { withCredentials: true }
    );
    return promise;
  }
  deleteCategory(id) {
    let promise = axios.delete(`http://localhost:3000/admin/categories/${id}`, {
      withCredentials: true,
    });
    return promise;
  }

  //============================================Book Services================================
  addBook(book) {
    let promise = axios.post("http://localhost:3000/book/addbook", book, {
      withCredentials: true,
    });
    return promise;
  }
  getAllBooks() {
    let promise = axios.get("http://localhost:3000/book/viewallbook", {
      withCredentials: true,
    });
    return promise;
  }
  deleteBook(id) {
    let promise = axios.delete(
      `http://localhost:3000/book/deletebook?id=${id}`,
      { withCredentials: true }
    );
    return promise;
  }
  getBookById(id) {
    let promise = axios.get(`http://localhost:3000/book/getbookbyid?id=${id}`, {
      withCredentials: true,
    });
    return promise;
  }
  updateBook(book) {
    let promise = axios.put("http://localhost:3000/book/updatebook", book, {
      withCredentials: true,
    });
    return promise;
  }

  getDashboardState() {
    let promise = axios.get("http://localhost:3000/admin/dashboadstate", {
      withCredentials: true,
    });
    return promise;
  }

  issuedBookDetails() {
    let promise = axios.get("http://localhost:3000/admin/issuedbookdetails", {
      withCredentials: true,
    });
    return promise;
  }

  // =============================================================
  searchUsers(name) {
    let promise = axios.get(
      `http://localhost:3000/admin/getuserbyname?name=${name}`,
      { withCredentials: true }
    );
    return promise;
  }

  searchBooksByName(name) {
    let promise = axios.get(
      `http://localhost:3000/book/getbookbyname?name=${name}`,
      { withCredentials: true }
    );
    return promise;
  }

  getIssueBooks() {
    let promise = axios.get("http://localhost:3000/admin/viewissuedbooks", {
      withCredentials: true,
    });
    return promise;
  }

  returnBook(id) {
    let promise = axios.put(
      `http://localhost:3000/admin/returnbook?id=${id}`,
      {},
      { withCredentials: true }
    );
    return promise;
  }
  issueBook(data) {
    let promise = axios.put("http://localhost:3000/admin/issuebook", data, {
      withCredentials: true,
    });
    return promise;
  }
}

export default new AdminService();
