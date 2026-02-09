import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../constants/routes";


const Navbar = () => {
  const { user, logout } = useAuth();   
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to={ROUTES.public.HOME} className="logo">
          📝 TodoApp
        </Link>

        <div className="nav-links">
          <Link to={ROUTES.public.HOME}>Home</Link>
          <Link to={ROUTES.public.ABOUT}>About</Link>

          {
            user
              ? <><Link to={ROUTES.private.DASHBOARD}>Dashboard</Link> <button onClick={logout}>Logout</button></>
              : <Link to={ROUTES.public.LOGIN}>Login</Link>
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
