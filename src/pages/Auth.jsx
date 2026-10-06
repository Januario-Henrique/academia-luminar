import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../store";
import { useT } from "../i18n";

export function Login() {
  const { login } = useApp();
  const { t } = useT();
  const navigate = useNavigate();
  const [f, setF] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const submit = (e) => {
    e.preventDefault();
    const res = login(f.email.trim(), f.password);
    if (res === "ok") navigate("/app");
    else setErr(res === "inactive" ? "login.inactive" : "login.err");
  };
  return (
    <section className="auth">
      <h1>{t("login.title")}</h1>
      {err && <p className="err">{t(err)}</p>}
      <form onSubmit={submit}>
        <label>{t("email")}<input type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} required /></label>
        <label>{t("password")}<input type="password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} required minLength={6} /></label>
        <button className="btn navy">{t("nav.login")}</button>
      </form>
      <p className="hint">{t("login.demo")}</p>
    </section>
  );
}

export function Register() {
  const { register } = useApp();
  const { t } = useT();
  const navigate = useNavigate();
  const [f, setF] = useState({ name: "", email: "", phone: "", password: "" });
  const [msg, setMsg] = useState(null);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const ok = register({ ...f, name: f.name.trim(), email: f.email.trim() });
    setMsg(ok ? "reg.ok" : "reg.exists");
    if (ok) setTimeout(() => navigate("/login"), 1200);
  };
  return (
    <section className="auth">
      <h1>{t("reg.title")}</h1>
      {msg && <p className={msg === "reg.ok" ? "ok" : "err"}>{t(msg)}</p>}
      <form onSubmit={submit}>
        <label>{t("name")}<input value={f.name} onChange={set("name")} required /></label>
        <label>{t("email")}<input type="email" value={f.email} onChange={set("email")} required /></label>
        <label>{t("phone")}<input type="tel" value={f.phone} onChange={set("phone")} required /></label>
        <label>{t("password")}<input type="password" value={f.password} onChange={set("password")} required minLength={6} /></label>
        <button className="btn navy">{t("nav.register")}</button>
      </form>
    </section>
  );
}
