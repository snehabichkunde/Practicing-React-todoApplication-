import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { USER_ROUTES } from '../constants/userProtectedRoutes';
import ProtectedRoute from '../constants/ProtectedRoute'

import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';



const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<Signup />} />
        <Route path={USER_ROUTES.Dashboard} element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
            }
        />
        <Route path='*' element={<Home />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;