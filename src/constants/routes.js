import About from "../pages/About";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

export const PATHS = {
  HOME: '/',
  ABOUT: '/about',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
};

export const ROUTES = {
  public: [
    { path: '/', component: Home },
    { path: '/about', component: About },
  ],
  auth: [
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
  ],
  private: [
    { path: '/dashboard', component: Dashboard },
  ],
};