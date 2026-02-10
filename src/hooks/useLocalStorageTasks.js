import { useState, useEffect } from 'react';

export const useLocalStorageTasks = (storageKey = 'tasks', initialData = []) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem(storageKey);
      const tasksToLoad = storedTasks ? JSON.parse(storedTasks) : initialData;
      setTasks(tasksToLoad);
      
      if (!storedTasks && initialData.length > 0) {
        localStorage.setItem(storageKey, JSON.stringify(initialData));
      }
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      setTasks(initialData);
    } finally {
      setIsLoading(false);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(tasks));
      } catch (error) {
        console.error('Error saving tasks to localStorage:', error);
      }
    }
  }, [tasks, storageKey, isLoading]);


  const getAllTasks = () => {
    return tasks;
  };


  const getTasksByUserId = (userId) => {
    return tasks.filter(task => task.userId === userId);
  };


  const getTodoTasks = (userId) => {
    return tasks.filter(task => task.userId === userId && !task.completed);
  };


  const getCompletedTasks = (userId) => {
    return tasks.filter(task => task.userId === userId && task.completed);
  };



  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      completed: false,
      createdAt: new Date().toISOString().split('T')[0],
      ...taskData,
      dueDate: taskData.dueDate || new Date().toISOString().split('T')[0]
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    return newTask;
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };


  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

 
  const filterTasks = (userId, { searchText = '', category = 'All', priority = 'All' }) => {
    return tasks.filter(task => {
      const belongsToUser = task.userId === userId;
      
      const matchesSearch = 
        task.title.toLowerCase().includes(searchText.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchText.toLowerCase());
      
      const matchesCategory = category === 'All' || task.category === category;
      const matchesPriority = priority === 'All' || task.priority === priority;

      return belongsToUser && matchesSearch && matchesCategory && matchesPriority;
    });
  };

  return {
    tasks,
    isLoading,
    getAllTasks,
    getTasksByUserId,
    getTodoTasks,
    getCompletedTasks,
    addTask,
    toggleTaskCompletion,
    deleteTask,
    filterTasks
  };
};