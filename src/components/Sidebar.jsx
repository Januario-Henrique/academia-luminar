
import './Sidebar.css';

function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'students', label: 'Students', icon: '👨‍🎓' },
    { id: 'courses', label: 'Courses & Fees', icon: '📚' },
    { id: 'payments', label: 'Payments', icon: '💳' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-brand">
        <span className="brand-icon">🎓</span>
        <div className="brand-text">
          <h1>Academia Luminar</h1>
          <small>Home Tutoring System</small>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={activeTab === item.id ? 'active' : ''}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={() => alert('Logged out')}>
          🚪 <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;