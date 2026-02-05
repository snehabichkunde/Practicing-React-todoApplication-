import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../constants/routes";
import { USER_ROUTES } from "../constants/userProtectedRoutes";


const Navbar = () => {
  const { user, logout } = useAuth();   
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to={ROUTES.HOME} className="logo">
          📝 TodoApp
        </Link>

        <div className="nav-links">
          <Link to={ROUTES.HOME}>Home</Link>
          <Link to={ROUTES.ABOUT}>About</Link>

          {
            user
              ? <><Link to={USER_ROUTES.Dashboard}>Dashboard</Link> <button onClick={logout}>Logout</button></>
              : <Link to={ROUTES.LOGIN}>Login</Link>
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
