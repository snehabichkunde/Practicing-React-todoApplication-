import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import "./assets/styles/global.css";
import { useLocalStorageUsers } from "./hooks/useLocalStorageUsers";
import { initialUsers } from "./data/initialData";

const ThemedApp = ({ userApi }) => {
  const { theme } = useTheme();
  document.documentElement.setAttribute("data-theme", theme);
  return <AppRoutes userApi={userApi} />;
};

function App() {
  const userApi = useLocalStorageUsers("users", initialUsers);
  
  return (
    <AuthProvider userApi={userApi}>
      <ThemeProvider>
        <ThemedApp userApi={userApi} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;