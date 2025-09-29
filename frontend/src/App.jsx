import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./component/Register";
import HomePage from "./component/HomePage";
import Login from "./component/Login";
import AdminDashboard from "./component/admin/AdminDashboard";
import UserDashboard from "./component/user/UserDashboard";
import AboutUs from "./component/AboutUs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutUs />} />

        {/* {Admin Routes} */}
        <Route path="/admin/*" element={<AdminDashboard />} />

        {/* User Routes (if applicable) */}
        <Route path="/user/*" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
