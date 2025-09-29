import axios from "axios";

class BookService {
  createBook(formData) {
    const promise = axios.post("http://localhost:3000/book/books", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return promise;
  }

  getAllBooks() {
    const promise = axios.get("http://localhost:3000/book/books");
    return promise;
  }

  deletebook(bid) {
    const promise = axios.delete(`http://localhost:3000/book/books/${bid}`);
    return promise;
  }

  updatebook(bookData, id) {
    const promise = axios.put(
      `http://localhost:3000/book/books/${id}`,
      bookData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return promise;
  }

  getBookById(id) {
    const promise = axios.get(`http://localhost:3000/book/books/${id}`);
    return promise;
  }

  getBookByName(name) {
    const promise = axios.get(`http://localhost:3000/book/books/name/${name}`);
    return promise;
  }
}

export default new BookService();
