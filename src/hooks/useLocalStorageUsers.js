import { useState, useEffect } from 'react';

export const useLocalStorageUsers = (storageKey = 'users', initialData = []) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem(storageKey);
      const usersToLoad = storedUsers ? JSON.parse(storedUsers) : initialData;
      setUsers(usersToLoad);
      
      if (!storedUsers && initialData.length > 0) {
        localStorage.setItem(storageKey, JSON.stringify(initialData));
      }
    } catch (error) {
      console.error('Error loading users from localStorage:', error);
      setUsers(initialData);
    } finally {
      setIsLoading(false);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(users));
      } catch (error) {
        console.error('Error saving users to localStorage:', error);
      }
    }
  }, [users, storageKey, isLoading]);


  const getAllUsers = () => {
    return users;
  };


  const getUserById = (userId) => {
    return users.find(user => user.id === userId);
  };

  const getUserByEmail = (email) => {
    return users.find(user => user.email === email);
  };

  const addUser = (userData) => {
    if (users.some(user => user.email === userData.email)) {
      throw new Error('User with this email already exists');
    }

    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString()
    };

    setUsers(prevUsers => [...prevUsers, newUser]);
    return newUser;
  };

  const updateUser = (userId, updates) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, ...updates } : user
      )
    );
  };

  const deleteUser = (userId) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  const verifyCredentials = (email, password) => {
    const user = users.find(
      user => user.email === email && user.password === password
    );
    return user || null;
  };


  const emailExists = (email) => {
    return users.some(user => user.email === email);
  };

  return {
    users,
    isLoading,
    getAllUsers,
    getUserById,
    getUserByEmail,
    addUser,
    updateUser,
    deleteUser,
    verifyCredentials,
    emailExists
  };
};