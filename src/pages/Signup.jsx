import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const {signup} = useAuth();
  const navigate = useNavigate(); 


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = signup(formData.name, formData.email, formData.password);

    if(success){
      navigate(USER_ROUTES.Dashboard);
    }else{
      //show an error 
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1>Create Account</h1>
        
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>
          
          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
        
        <p className="login-link">
          Already have an account? <Link to={ROUTES.public.LOGIN}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;