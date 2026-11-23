
import "./sidebar.css";
import {
  Award,
  ArrowLeftRight,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  ClipboardCheck,
  GraduationCap,
  LayoutDashboard,
  Settings,
  UserRound,
} from "lucide-react";

function Sidebar({ activePage, setActivePage }) {

  const workspaceItems = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "Markets", icon: ChartNoAxesCombined },
    { name: "Portfolio", icon: BriefcaseBusiness },
    { name: "Transactions", icon: ArrowLeftRight },
  ];
  const developmentItems = [
    { name: "Academy", icon: GraduationCap },
    { name: "Practice & Quizzes", icon: ClipboardCheck },
    { name: "Achievements", icon: Award },
  ];

  function renderItems(items) {
    return items.map(({ name, icon: Icon }) => (
      <button
        key={name}
        type="button"
        title={name}
        aria-label={name}
        aria-current={activePage === name ? "page" : undefined}
        className={`nav-item ${activePage === name ? "active" : ""}`}
        onClick={() => setActivePage(name)}
      >
        <Icon className="nav-icon" size={17} strokeWidth={1.8} aria-hidden="true" />
        <span>{name}</span>
      </button>
    ));
  }

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon" aria-hidden="true">V</div>
        <h2>VESTORA</h2>
      </div>

      <nav className="sidebar-navigation" aria-label="Main navigation">
        <div className="nav-group">
          <p className="menu-label">WORKSPACE</p>
          <div className="sidebar-menu">{renderItems(workspaceItems)}</div>
        </div>

        <div className="nav-group development-group">
          <p className="menu-label">INVESTOR DEVELOPMENT</p>
          <div className="sidebar-menu">{renderItems(developmentItems)}</div>
        </div>
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-menu bottom-menu">
          <button type="button" title="User Profile" aria-label="User Profile" aria-current={activePage === "User Profile" ? "page" : undefined} className={`nav-item ${activePage === "User Profile" ? "active" : ""}`} onClick={() => setActivePage("User Profile")}>
            <UserRound className="nav-icon" size={17} strokeWidth={1.8} aria-hidden="true" />
            <span>User Profile</span>
          </button>
          <button type="button" title="Settings" aria-label="Settings" aria-current={activePage === "Settings" ? "page" : undefined} className={`nav-item ${activePage === "Settings" ? "active" : ""}`} onClick={() => setActivePage("Settings")}>
            <Settings className="nav-icon" size={17} strokeWidth={1.8} aria-hidden="true" />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
