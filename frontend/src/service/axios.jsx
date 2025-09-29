import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000", // your backend URL
  withCredentials: true, // allows cookies to be sent for JWT
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
 