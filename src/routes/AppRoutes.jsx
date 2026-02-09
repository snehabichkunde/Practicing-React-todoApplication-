import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { USER_ROUTES } from '../constants/userProtectedRoutes';
import {ProtectedRoute, AuthRoute} from '../constants/ProtectedRoute'

import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';



const AppRoutes = () => {
  return (
    <BrowserRouter basename="/Practicing-React-todoApplication-/">
      <Navbar />
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.LOGIN} element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
            }
        />
        <Route path={ROUTES.SIGNUP} element={
                <AuthRoute>
                  <Signup />
                </AuthRoute>
            }
        />
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