import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useApp } from "./store";
import { useT } from "./i18n";
import { WHATSAPP, WHATSAPP_LABEL } from "./data";
import Logo from "./components/Logo";

const menus = {
  parent: [["/app", "m.dashboard"], ["/app/children", "m.children"], ["/app/enroll", "m.enroll"], ["/app/payments", "m.payments"]],
  tutor: [["/app", "m.dashboard"], ["/app/students", "m.students"], ["/app/sessions", "m.sessions"]],
  admin: [["/app", "m.dashboard"], ["/app/requests", "m.requests"], ["/app/payments", "m.payments"]],
};

function LangSwitch() {
  const { lang, setLang } = useT();
  return (
    <div className="lang" role="group" aria-label="Language">
      {["pt", "en"].map((l) => (
        <button key={l} className={lang === l ? "on" : ""} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
      ))}
    </div>
  );
}

export function WhatsApp({ big }) {
  const { t } = useT();
  return (
    <a className={"wa" + (big ? " big" : "")} href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">
      <small>{t("wa")}</small><strong>{WHATSAPP_LABEL}</strong>
    </a>
  );
}

export function PublicLayout() {
  const { t } = useT();
  const { user } = useApp();
  return (
    <>
      <header className="top">
        <NavLink to="/"><Logo /></NavLink>
        <nav>
          <NavLink to="/" end>{t("nav.home")}</NavLink>
          {user ? <NavLink to="/app">{t("m.dashboard")}</NavLink> : <>
            <NavLink to="/login">{t("nav.login")}</NavLink>
            <NavLink to="/register" className="pill">{t("nav.register")}</NavLink>
          </>}
          <LangSwitch />
        </nav>
      </header>
      <Outlet />
      <footer className="foot"><Logo light /><p>{t("brand.tag")} · © 2026 Academia Luminar · {WHATSAPP_LABEL}</p></footer>
    </>
  );
}

export function AppLayout() {
  const { user, logout } = useApp();
  const { t } = useT();
  const navigate = useNavigate();
  if (!user) return <Navigate to="/login" replace />;
  return (
    <div className="shell">
      <aside className="side">
        <Logo light />
        <nav>
          {menus[user.role].map(([to, key]) => <NavLink key={to} to={to} end={to === "/app"}>{t(key)}</NavLink>)}
        </nav>
        <div className="side-foot">
          <small>{user.name}</small>
          <LangSwitch />
          <button className="link" onClick={() => { logout(); navigate("/"); }}>{t("logout")}</button>
        </div>
      </aside>
      <main className="content"><Outlet /></main>
    </div>
  );
}

export function Only({ roles, children }) {
  const { user } = useApp();
  return roles.includes(user?.role) ? children : <Navigate to="/app" replace />;
}
