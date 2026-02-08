import { createContext, useContext } from 'react';
import { useLocalStorageTasks } from '../hooks/useLocalStorageTasks';
import { initialTasks } from '../data/initialData';

const TaskContext = createContext(null);


export const TaskProvider = ({ children }) => {
  const taskApi = useLocalStorageTasks('tasks', initialTasks);

  return (
    <TaskContext.Provider value={taskApi}>
      {children}
    </TaskContext.Provider>
  );
};


export const useTasks = () => {
  const context = useContext(TaskContext);
  
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  
  return context;
};