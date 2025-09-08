import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import { register } from "../api/register";
import { loginBasic } from "../auth";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    const id = Math.floor(Date.now() / 1000);

    try {
      await register({ id, name: name.trim(), email: email.trim(), password });
      // Log the user in after registering
      await loginBasic({ email: email.trim(), password });
      navigate("/dashboard");
    } catch (e2) {
      setErr(e2.message || "Registration failed");
    }
  }

  return (
<>
      <NavigationBar />
      <div className="login-container">
        <form onSubmit={onSubmit} className="login-form">
          <h1 className="login-header">Register</h1>

          <input
            className="login-input"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            autoComplete="username"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            autoComplete="new-password"
          />

          <br />

          {err && <div style={{ color: "crimson", marginBottom: 8 }}>{err}</div>}

          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </>
  );
}
