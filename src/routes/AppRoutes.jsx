import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { ProtectedRoute, AuthRoute } from '../constants/ProtectedRoute';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';

const AppRoutes = () => {
  return (
    <BrowserRouter basename="/Practicing-React-todoApplication-/">
      <Navbar />
      <Routes>
        {ROUTES.public.map((route) => (
          <Route 
            key={route.path} 
            path={route.path} 
            element={<route.component />} 
          />
        ))}

        {ROUTES.auth.map((route) => (
          <Route 
            key={route.path} 
            path={route.path} 
            element={
              <AuthRoute>
                <route.component />
              </AuthRoute>
            } 
          />
        ))}

        {ROUTES.private.map((route) => (
          <Route 
            key={route.path} 
            path={route.path} 
            element={
              <ProtectedRoute>
                <route.component />
              </ProtectedRoute>
            } 
          />
        ))}

        <Route path='*' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;