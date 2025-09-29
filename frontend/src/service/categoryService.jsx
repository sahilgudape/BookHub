import axios from "axios";

class categoryService {
  createCategory(name) {
    const promise = axios.post(
      `http://localhost:3000/admin/categories`,
      { name },
      { withCredentials: true }
    );
    return promise;
  }

  getCategoryByName(category) {
    const promise = axios.get(`http://localhost:3000/admin/categories`);
    return promise;
  }

  getAllCategory() {
    const promise = axios.get(`http://localhost:3000/admin/categories`, {
      withCredentials: true,
    });
    return promise;
  }

  deleteCategory(id) {
    const promise = axios.delete(
      `http://localhost:3000/admin/categories/${id}`,
      { withCredentials: true }
    );
    return promise;
  }

  updateCategory(id, name) {
    const promise = axios.put(
      `http://localhost:3000/admin/categories/${id}`,
      { name },
      { withCredentials: true }
    );
    return promise;
  }

  getCategoryById(id) {
    const promise = axios.get(`http://localhost:3000/admin/categories/${id}`, {
      withCredentials: true,
    });
    return promise;
  }
}

export default new categoryService();
