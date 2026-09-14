import "./Header.css";
import logo from "../../images/logo.svg";
import { Link, useLocation } from "react-router-dom";

function Header({ email, onLogout, loggedIn }) {
  const location = useLocation();

  return (
    <header
      className={`header ${loggedIn ? "header--logged" : "header--auth"}`}
    >
      <div className="header__container">
        <img src={logo} alt="Around The U.S. logo" className="header__logo" />

        {loggedIn ? (
          <div className="header__user">
            <p className="header__email">{email}</p>
            <button className="header__logout" onClick={onLogout}>
              Cerrar sesión
            </button>
          </div>
        ) : location.pathname === "/signup" ? (
          <Link to="/signin" className="header__link">
            Inicia sesión
          </Link>
        ) : (
          <Link to="/signup" className="header__link">
            Regístrate
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
