import { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
  e.preventDefault();
  console.log("Login button clicked");

  try {
    const res = await API.post("/auth/login", {
      email,
      password,
    });

    console.log("Login response:", res.data);

    localStorage.setItem("token", res.data.token);
    window.location.href = "/dashboard";
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    alert("Login failed");
  }
};


  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password"
        onChange={(e) => setPassword(e.target.value)} />
      <button>Login</button>
      <p style={{ marginTop: "10px" }}>
      New user?{" "}
       <Link to="/register" style={{ color: "#3498db" }}>
        Register here
       </Link>
</p>

    </form>
  );
};

export default Login;
