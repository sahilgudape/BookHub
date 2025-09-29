import axios from "axios";

class BorrowService {
  borrowBook(bookId) {
    const promise = axios.post(
      `http://localhost:3000/user/borrow/${bookId}`,
      {},
      { withCredentials: true }
    );
    return promise;
  }

  returnBook(borrowId) {
    const promise = axios.post(
      `http://localhost:3000/user/return/${borrowId}`,
      {},
      { withCredentials: true }
    );
    return promise;
  }

  getMyIssuedBooks(userId) {
    return axios.get(`http://localhost:3000/issue/users/${userId}/issues`, {
      withCredentials: true,
    });
  }

  getMyBorrowedBooks() {
    return axios.get("http://localhost:3000/user/my-books", {
      withCredentials: true,
    });
  }

  getBorrowHistory() {
    const promise = axios.get("http://localhost:3000/user/borrow-history", {
      withCredentials: true,
    });
    return promise;
  }
}

export default new BorrowService();
