
import "./navbar.css";
import { Bell, Search } from "lucide-react";

function Navbar({ activePage, searchTerm, setSearchTerm }) {

  return (
    <header className="navbar">

      {/* Left Section */}
      <div className="navbar-heading">
        <p className="breadcrumb">VESTORA <span>/</span> SIMULATOR <span>/</span> {activePage.toUpperCase()}</p>
        <h1>{activePage === "Overview" ? "Command center" : activePage}</h1>
      </div>

      {/* Right Section */}
      <div className="navbar-actions">

        {/* Search */}
        <label className="search-bar">
          <Search size={16} strokeWidth={1.8} aria-hidden="true" />
          <input
            type="text"
            placeholder="Search markets..."
            aria-label="Search stocks"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <kbd>/</kbd>
        </label>

        {/* Notifications */}
        <button className="notification-btn" aria-label="Notifications">
          <Bell size={17} strokeWidth={1.8} aria-hidden="true" />
          <span className="notification-dot"></span>
        </button>

        {/* Profile */}
        <div className="navbar-profile">
          <div className="profile-avatar">S</div>
          <div className="profile-copy"><strong>Samira</strong><span>LEVEL 04 · TRADER</span></div>
        </div>

      </div>

    </header>
  );
}

export default Navbar;
