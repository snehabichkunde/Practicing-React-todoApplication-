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
    <AuthProvider>
      <UserProvider>
        <TaskProvider>
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
    </TaskProvider>
    </UserProvider>
    
    </AuthProvider>
  );
}

export default App;