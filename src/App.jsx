import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { TaskProvider } from './context/TaskContext';
import AppRoutes from './routes/AppRoutes';
import './assets/styles/global.css';

const ThemedApp = () => {
  const { theme } = useTheme();
  
  document.documentElement.setAttribute('data-theme', theme);
  
  return <AppRoutes />;
};

function App() {
  return (
    
      <UserProvider>
        <AuthProvider>
        <TaskProvider>
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
    </TaskProvider>
    </AuthProvider>
    </UserProvider>
    
  );
}

export default App;