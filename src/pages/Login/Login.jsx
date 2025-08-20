import "./Login.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [csrfToken, setCsrfToken] = useState("");
  const [jwtToken, setJwtToken] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const isFormInvalid = !form.username || !form.password || !csrfToken;

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/chat";

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

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      const token = data?.token || data?.accessToken || data?.jwt;

      if (!token) {
        setMessage({
          text: "Inloggning misslyckades. Ingen token mottagen.",
          type: "error",
        });
        return;
      }
      if (token) {
        const payload = jwtDecode(token);
        console.log("Decoded JWT Payload:", payload);

        const authUser = {
          id: payload.id ?? null,
          user: payload.user ?? "",
          email: payload.email ?? "",
          avatar: payload.avatar || "https://i.pravatar.cc/300",
          exp: payload.exp ?? null,
          invite: payload.invite ?? null,
          token,
          iat: payload.iat ?? null,
        };

        sessionStorage.setItem("auth_user", JSON.stringify(authUser));

        setJwtToken(token);

        sessionStorage.setItem("jwt_token", token);
        setMessage({ text: "Inloggad!", type: "success" });
        navigate(from, { replace: true });

        return;
      }
    } catch (err) {
      console.error(err);
      setMessage({ text: "Nätverksfel.", type: "error" });
    }
  };

  console.log(jwtToken);

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
        {message.text && (
          <p className={`login-message ${message.type}`}>{message.text}</p>
        )}
        <button
          className="login-button"
          onClick={handleLogin}
          disabled={isFormInvalid}
        >
          Logga in
        </button>{" "}
        <div className="nav-link">
          Har du inget konto? <Link to="/register">Registrera här</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
