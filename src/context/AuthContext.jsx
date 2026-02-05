import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {initialUsers} from "../data/initialData"

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);

  const login = (email, password) => {
    const foundUser = initialUsers.find(
        (u) => u.email === email && u.password === password
    );

    if (foundUser) {
        const userData = {
        id: foundUser.id,
        email: foundUser.email,
        };

        setUser(userData);  
        return true;
    }

  return false;
};


  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
