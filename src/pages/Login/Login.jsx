import "./Login.css";
import React, { useState, useEffect } from "react";

const Login = () => {
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    fetch("https://chatify-api.up.railway.app/csrf", {
      method: "PATCH",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setCsrfToken(data.csrfToken);
      });
  }, []);

  console.log("CSRF Token:", csrfToken);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Logga in</h2>
        <input type="text" placeholder="Användarnamn" className="login-input" />
        <input type="password" placeholder="Lösenord" className="login-input" />
        <button className="login-button">Logga in</button>{" "}
        <div className="nav-link">
          Har du inget konto? <a href="/register">Registrera här</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
