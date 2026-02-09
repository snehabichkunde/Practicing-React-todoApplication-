import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();      
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
  e.preventDefault();

  const success = login(email, password);

  if (success) {
    navigate(USER_ROUTES.Dashboard);
  } else {
    //setError("Invalid email or password");
    console.log("error");
  }
};

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login to TodoApp</h1>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        
        <p className="signup-link">
          Don't have an account? <Link to={ROUTES.public.SIGNUP}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;