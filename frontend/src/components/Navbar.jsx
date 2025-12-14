import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let isAdmin = false;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log("DECODED JWT:", decoded); // 🔍 DEBUG LINE

      isAdmin = decoded.role === "admin";
    } catch (err) {
      console.error("JWT decode failed", err);
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!token) return null;

  return (
    <nav style={{ marginBottom: "20px" }}>
      <Link to="/dashboard" style={{ marginRight: "15px" }}>
        Dashboard
      </Link>

      {/* 👑 ADMIN ONLY */}
      {isAdmin && (
        <Link to="/admin" style={{ marginRight: "15px" }}>
          Admin
        </Link>
      )}

      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
