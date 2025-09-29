import axios from "axios";

class AuthService {
  register(data) {
    return axios.post("/register", data);
  }

  login(data) {
    return axios.post("/auth/login", data);
  }

  logout() {
    return axios.get("/auth/logout");
  }

  getProfile() {
    return axios.get("/user/profile");
  }
}

export default new AuthService();
