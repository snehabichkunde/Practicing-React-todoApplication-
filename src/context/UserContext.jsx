import { createContext, useContext } from 'react';
import { useLocalStorageUsers } from '../hooks/useLocalStorageUsers';
import { initialUsers } from '../data/initialData';

const UserContext = createContext(null);


export const UserProvider = ({ children }) => {
  const userApi = useLocalStorageUsers('users', initialUsers);

  return (
    <UserContext.Provider value={userApi}>
      {children}
    </UserContext.Provider>
  );
};


export const useUsers = () => {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  
  return context;
};