import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { USER_ROUTES } from '../constants/userProtectedRoutes';
import {useAuth} from '../context/AuthContext'

const Home = () => {
  const {user} = useAuth();
  const getStartedLink = user ? USER_ROUTES.Dashboard : ROUTES.LOGIN;
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Welcome to TodoApp</h1>
        <p>Organize your life, one task at a time.</p>
        
        <div className="cta-buttons">
          <Link to={getStartedLink}>
            <button className="btn btn-primary">Get Started</button>
          </Link>
          <Link to={ROUTES.ABOUT}>
            <button className="btn btn-secondary">Learn More</button>
          </Link>
        </div>
      </div>
      
      <div className="features">
        <h2>Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <span className="icon">✅</span>
            <h3>Simple Task Management</h3>
            <p>Add, edit, and complete tasks with ease</p>
          </div>
          <div className="feature-card">
            <span className="icon">📊</span>
            <h3>Track Progress</h3>
            <p>See your productivity stats at a glance</p>
          </div>
          <div className="feature-card">
            <span className="icon">🎯</span>
            <h3>Stay Organized</h3>
            <p>Filter and categorize your tasks</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;