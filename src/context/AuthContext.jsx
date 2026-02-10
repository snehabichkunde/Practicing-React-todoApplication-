import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children, userApi }) => {  
  const [user, setUser] = useLocalStorage("user", null);
  const { verifyCredentials, addUser, emailExists } = userApi;  

  const login = (email, password) => {
    const foundUser = verifyCredentials(email, password);
    if (foundUser) {
      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
      };
      setUser(userData);  
      return { success: true };
    }
    return { success: false, message: "Invalid credentials" };
  };

  const signup = (name, email, password) => {
    if (emailExists(email)) {
      return { success: false, message: "User already exists" };
    }
    try {
      const newUser = addUser({
        name,
        email,
        password,
        role: 'user'
      });
      const userData = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      };
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};