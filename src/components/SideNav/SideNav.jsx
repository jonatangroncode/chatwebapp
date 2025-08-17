import "./SideNav.css";

const SideNav = () => {
  return (
    <aside className="sidebar" aria-label="Sidomeny">
      <nav className="sidebar-header">
        <img src="./emess.png" alt="logo" />
        <ul className="sidebar-links">
          <h4>
            <span>Huvud meny</span>
          </h4>

          <li className="sidebar-item">
            <a href="#" className="sidebar-link">
              <span className="material-symbols-outlined" aria-hidden="true">
                chat
              </span>
              <span className="link-text">Chat</span>
            </a>
          </li>

          <li className="sidebar-item">
            <a href="#" className="sidebar-link">
              <span className="material-symbols-outlined" aria-hidden="true">
                notifications_active
              </span>
              <span className="link-text">Notiser</span>
            </a>
          </li>

          <li className="sidebar-item">
            <a href="#" className="sidebar-link">
              <span className="material-symbols-outlined" aria-hidden="true">
                account_circle
              </span>
              <span className="link-text">Profil</span>
            </a>
          </li>

          <li className="sidebar-item">
            <a href="#" className="sidebar-link">
              <span className="material-symbols-outlined" aria-hidden="true">
                settings
              </span>
              <span className="link-text">Inställningar</span>
            </a>
          </li>

          <li className="sidebar-item">
            <a href="#" className="sidebar-link">
              <span className="material-symbols-outlined" aria-hidden="true">
                logout
              </span>
              <span className="link-text">Logga ut</span>
            </a>
          </li>
        </ul>
      </nav>

      <div className="user-account">
        <div className="user-profile">
          <img src="https://i.pravatar.cc/300" alt="profile" />
          <div className="user-detail">
            <h3>Ben Smith</h3>
            <span>ben.smith@example.com</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideNav;
