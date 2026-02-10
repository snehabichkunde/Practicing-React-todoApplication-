import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { PATHS } from "../constants/routes";


const Navbar = () => {
  const { user, logout } = useAuth();   
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to={PATHS.HOME} className="logo">
          📝 TodoApp
        </Link>

        <div className="nav-links">
          <Link to={PATHS.HOME}>Home</Link>
          <Link to={PATHS.ABOUT}>About</Link>

          {
            user
              ? <><Link to={PATHS.DASHBOARD}>Dashboard</Link> <button onClick={logout}>Logout</button></>
              : <Link to={PATHS.LOGIN}>Login</Link>
          }

          <button onClick={toggleTheme} className="theme-toggle">
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
