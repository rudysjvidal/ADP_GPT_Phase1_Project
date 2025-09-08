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
    try {
      await register({ name: name.trim(), email: email.trim(), password });
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
      <form onSubmit={onSubmit} className="max-w-md mx-auto p-6 space-y-3">
        <h1 className="text-2xl font-semibold">Create account</h1>
        <input className="border p-2 w-full" placeholder="Name" value={name}
               onChange={e=>setName(e.target.value)} />
        <input className="border p-2 w-full" type="email" placeholder="Email" value={email}
               onChange={e=>setEmail(e.target.value)} autoComplete="username" />
        <input className="border p-2 w-full" type="password" placeholder="Password" value={password}
               onChange={e=>setPassword(e.target.value)} autoComplete="new-password" />
        {err && <div className="text-red-600 text-sm">{err}</div>}
        <button className="px-3 py-2 rounded bg-blue-600 text-white">Register</button>
      </form>
    </>
  );
}
