import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import './assets/styles/global.css';

const ThemedApp = () => {
  const { theme } = useTheme();
  
  document.documentElement.setAttribute('data-theme', theme);
  
  return <AppRoutes />;
};

function App() {
  return (
    <AuthProvider>
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
    </AuthProvider>
  );
}

export default App;