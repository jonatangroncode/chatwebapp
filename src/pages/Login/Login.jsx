import "./Login.css";
import React, { useState, useEffect } from "react";

const Login = () => {
  const [csrfToken, setCsrfToken] = useState("");
  const [jwtToken, setJwtToken] = useState("");

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("https://chatify-api.up.railway.app/auth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: form.username,
          password: form.password,
          csrfToken,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        alert(data?.message || "inloggad!");
      } else {
        alert(data?.message || `inloggning misslyckades. (${res.status})`);
        console.log(form);
      }
    } catch (err) {
      console.error(err);
      alert("Nätverksfel.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Logga in</h2>
        <input
          type="text"
          placeholder="Användarnamn"
          name="username"
          className="login-input"
          value={form.username}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Lösenord"
          name="password"
          className="login-input"
          value={form.password}
          onChange={handleChange}
        />
        <button
          className="login-button"
          onClick={handleLogin}
          disabled={!csrfToken || !form.username || !form.password}
        >
          Logga in
        </button>{" "}
        <div className="nav-link">
          Har du inget konto? <a href="/register">Registrera här</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
