import "./SideNav.css";
import { useNavigate } from "react-router-dom";
import { sanitizeText } from "../../utils/sanitize";

const SideNav = () => {
  const auth = JSON.parse(sessionStorage.getItem("auth_user"));

  const navigate = useNavigate();

  const avatarSrc =
    auth?.avatar && auth.avatar.trim() !== ""
      ? auth.avatar
      : "https://i.pravatar.cc/200";

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
            <a
              href="#"
              className="sidebar-link"
              onClick={() => {
                sessionStorage.removeItem("jwt_token");
                sessionStorage.removeItem("auth_user");
                navigate("/", {
                  replace: true,
                });
              }}
            >
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
          <img src={avatarSrc} alt="profile picture" />
          <div className="user-detail">
            <h3>{sanitizeText(auth?.user ?? "Okänd användare")}</h3>
            <span>{sanitizeText(auth?.email ?? "Okänd e-post")}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideNav;
