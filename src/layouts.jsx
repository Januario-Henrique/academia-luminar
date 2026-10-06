import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useApp } from "./store";

const menus = {
  student: [
    ["/dashboard", "📊 Dashboard"], ["/dashboard/payments", "💳 Payment Info"],
    ["/dashboard/registration", "📝 Registration"], ["/dashboard/courses", "📚 My Courses"],
    ["/dashboard/internships", "💼 Internships"], ["/dashboard/drop-semester", "❌ Drop Semester"],
    ["/dashboard/results", "📑 Results"], ["/dashboard/notices", "📢 Notices"], ["/dashboard/schedule", "📅 Schedule"],
  ],
  employer: [
    ["/dashboard", "📊 Dashboard"], ["/dashboard/postings", "📌 Internship Postings"],
    ["/dashboard/candidates", "👥 Candidates"], ["/dashboard/notices", "📢 Notices"],
  ],
};

const Footer = () => (
  <footer id="main-footer"><p>&copy; 2026 Academia Luminar. All rights reserved.</p></footer>
);

export function PublicLayout() {
  const links = [["/", "Home"], ["/about", "About Us"], ["/login", "Login"],
    ["/register/student", "Student Register"], ["/register/employer", "Employer Register"]];
  return (
    <>
      <header id="main-header">
        <h1>Academia Luminar</h1>
        <nav><ul>{links.map(([to, label]) => <li key={to}><NavLink to={to}>{label}</NavLink></li>)}</ul></nav>
      </header>
      <main><Outlet /></main>
      <Footer />
    </>
  );
}

export function DashboardLayout() {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  if (!user) return <Navigate to="/login" replace />; // route protection

  return (
    <>
      <div className="dashboard-wrapper">
        <aside className="sidebar">
          <div className="sidebar-logo">🎓 <h2>Academia Luminar</h2></div>
          <ul className="sidebar-menu">
            {menus[user.role].map(([to, label]) => (
              <li key={to}><NavLink to={to} end={to === "/dashboard"}>{label}</NavLink></li>
            ))}
            <li>
              <a href="#" className="logout-btn" onClick={(e) => { e.preventDefault(); logout(); navigate("/"); }}>🚪 Logout</a>
            </li>
          </ul>
        </aside>
        <main className="dashboard-main"><Outlet /></main>
      </div>
      <Footer />
    </>
  );
}

// Only lets the given role open the page
export function Only({ role, children }) {
  const { user } = useApp();
  return user?.role === role ? children : <Navigate to="/dashboard" replace />;
}
