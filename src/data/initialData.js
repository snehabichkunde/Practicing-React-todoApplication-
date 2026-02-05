export const initialUsers = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'user@example.com',
    password: 'user123',
    role: 'user',
    createdAt: '2024-01-20'
  },
  {
    id: 3,
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'jane123',
    role: 'user',
    createdAt: '2024-02-01'
  }
];

export const initialTasks = [
  {
    id: 1,
    title: 'Complete React assignment',
    description: 'Build todo app with routing and context API',
    category: 'Work',
    priority: 'High',
    completed: false,
    userId: 2,
    createdAt: '2024-02-01',
    dueDate: '2024-02-10'
  },
  {
    id: 2,
    title: 'Buy groceries',
    description: 'Milk, bread, eggs, vegetables',
    category: 'Shopping',
    priority: 'Medium',
    completed: false,
    userId: 2,
    createdAt: '2024-02-03',
    dueDate: '2024-02-06'
  },
  {
    id: 3,
    title: 'Gym workout',
    description: 'Chest and triceps day',
    category: 'Health',
    priority: 'Low',
    completed: true,
    userId: 2,
    createdAt: '2024-02-04',
    dueDate: '2024-02-04'
  },
  {
    id: 4,
    title: 'Read React documentation',
    description: 'Study hooks and context API in depth',
    category: 'Learning',
    priority: 'Medium',
    completed: false,
    userId: 2,
    createdAt: '2024-02-02',
    dueDate: '2024-02-08'
  },
  {
    id: 5,
    title: 'Plan weekend trip',
    description: 'Research destinations and book hotels',
    category: 'Personal',
    priority: 'Low',
    completed: false,
    userId: 2,
    createdAt: '2024-02-05',
    dueDate: '2024-02-15'
  },
  {
    id: 6,
    title: 'Team meeting preparation',
    description: 'Prepare slides and agenda',
    category: 'Work',
    priority: 'High',
    completed: true,
    userId: 3,
    createdAt: '2024-02-01',
    dueDate: '2024-02-03'
  },
  {
    id: 7,
    title: 'Fix bike',
    description: 'Take bike to repair shop',
    category: 'Personal',
    priority: 'Medium',
    completed: false,
    userId: 3,
    createdAt: '2024-02-04',
    dueDate: '2024-02-07'
  }
];