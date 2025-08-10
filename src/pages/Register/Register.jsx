import React, { useState, useEffect } from "react";
import "./Register.css";

const Register = () => {
  const [csrfToken, setCsrfToken] = useState("");

  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    avatar: "",
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

  const handleRegister = async () => {
    try {
      const res = await fetch(
        "https://chatify-api.up.railway.app/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            username: form.username,
            password: form.password,
            email: form.email,
            avatar: form.avatar,
            csrfToken,
          }),
        }
      );

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        alert(data?.message || "Registrerad!");
      } else {
        alert(data?.message || `Registrering misslyckades. (${res.status})`);
        console.log(form);
      }
    } catch (err) {
      console.error(err);
      alert("Nätverksfel.");
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValidUrl = (url) => {
    try {
      return Boolean(new URL(url));
    } catch {
      return false;
    }
  };

  const isFormInvalid =
    !form.username || !form.password || !form.email || !csrfToken;

  return (
    <>
      {" "}
      <div className="register-container">
        <div className="register-card">
          <h2 className="register-title">Registrera dig</h2>

          <input
            type="text"
            name="username"
            placeholder="Användarnamn"
            value={form.username}
            onChange={handleChange}
            className="register-input"
          />

          <input
            type="password"
            name="password"
            placeholder="Lösenord"
            value={form.password}
            onChange={handleChange}
            className="register-input"
          />

          <input
            type="email"
            name="email"
            placeholder="E-post"
            value={form.email}
            onChange={handleChange}
            className="register-input"
          />

          <div className="input-with-button">
            <input
              type="url"
              name="avatar"
              placeholder="Avatar URL, eg: https://picsum.photos/75/75"
              value={form.avatar}
              onChange={handleChange}
              className="register-input"
            />
            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  avatar: `https://picsum.photos/75?random=${Math.floor(
                    Math.random() * 1000
                  )}`,
                })
              }
              className="random-avatar-btn"
              title="Slumpa avatar"
            >
              🎲
            </button>
          </div>

          {isValidUrl(form.avatar) && (
            <div className="avatar-preview">
              <img src={form.avatar} alt="Avatar Preview" />
            </div>
          )}

          <button
            onClick={handleRegister}
            disabled={isFormInvalid}
            className="register-button"
          >
            Registrera
          </button>
          <div className="nav-link">
            Har du redan konto? <a href="/">Logga in här</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
