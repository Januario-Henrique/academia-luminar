import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useApp } from "../store";

export function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", role: "student" });
  const [error, setError] = useState("");
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (login(form.email.trim(), form.password, form.role)) navigate("/dashboard");
    else setError("Incorrect email or password.");
  };

  return (
    <section>
      <h2>User Login</h2>
      <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
      <form onSubmit={submit}>
        <label>Email Address: <input type="email" name="email" value={form.email} onChange={change} required /></label>
        <label>Password: <input type="password" name="password" value={form.password} onChange={change} required minLength={6} /></label>
        <label>User Role:
          <select name="role" value={form.role} onChange={change}>
            <option value="student">Student</option>
            <option value="employer">Employer</option>
          </select>
        </label>
        <button type="submit">Login</button>
      </form>
      <p className="hint">Demo: student@example.com or employer@example.com / password123</p>
    </section>
  );
}

function RegisterForm({ role }) {
  const { register } = useApp();
  const navigate = useNavigate();
  const isStudent = role === "student";
  const [form, setForm] = useState({ name: "", companyName: "", email: "", password: "" });
  const [msg, setMsg] = useState({ text: "", color: "green" });
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const payload = { ...form, name: form.name.trim(), email: form.email.trim() };
    if (isStudent) delete payload.companyName;
    const res = register(role, payload);
    setMsg({ text: res.message, color: res.ok ? "green" : "red" });
    if (res.ok) setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <section>
      <h2>{isStudent ? "Student Registration" : "Employer Registration"}</h2>
      <p style={{ fontWeight: "bold", color: msg.color }}>{msg.text}</p>
      <form onSubmit={submit}>
        <label>{isStudent ? "Full Name:" : "Contact Name:"} <input name="name" value={form.name} onChange={change} required /></label>
        {!isStudent && <label>Company Name: <input name="companyName" value={form.companyName} onChange={change} required /></label>}
        <label>{isStudent ? "Email:" : "Work Email:"} <input type="email" name="email" value={form.email} onChange={change} required /></label>
        <label>Password: <input type="password" name="password" value={form.password} onChange={change} required minLength={6} /></label>
        <button type="submit">{isStudent ? "Register as Student" : "Register as Employer"}</button>
      </form>
    </section>
  );
}

export function Register() {
  const { role } = useParams();
  if (role !== "student" && role !== "employer") return <Navigate to="/" replace />;
  return <RegisterForm key={role} role={role} />;
}
