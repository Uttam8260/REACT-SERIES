import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./login.css";

const Login = () => {
  const uname = useRef();
  const upwd = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const login = () => {
    if (!uname.current.value || !upwd.current.value) {
      setError("Username and Password are required");
      return;
    }

    fetch('http://localhost:9000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: uname.current.value,
        password: upwd.current.value
      })
    })
    .then(res => {
      if (!res.ok) throw new Error("Invalid username or password");
      return res.json();
    })
    .then(data => {
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("role", data.role);

      if (data.role === "ROLE_USER") {
        navigate("/dashboard");
      } else if (data.role === "ROLE_ADMIN") {
        navigate("/admin-dashboard"); // Create this route/component separately
      } else {
        setError("Unknown user role");
      }
    })
    .catch(err => {
      setError(err.message);
    });
  };

  return (
    <div className="login-page">
      <Header />

      <div className="login-container">
        <div className="login-box">
          <h2>User Login</h2>
          {error && <p className="error-message">{error}</p>}
          <input ref={uname} placeholder="Enter username" />
          <input ref={upwd} type="password" placeholder="Enter password" />
          <button onClick={login}>Login</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
