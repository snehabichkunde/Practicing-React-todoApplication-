import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { initialUsers, initialTasks } from "../data/initialData";
import  {categories}  from "../data/categories";
import  {priorities}  from "../data/priorities";



const Dashboard = () => {
  const { user } = useAuth();
  const currentUser = initialUsers.find(u => u.email === user.email);
  
  // State management
  const [tasks, setTasks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [addToCompleted, setAddToCompleted] = useState(false);
  const [newTask, setNewTask] = useState(getInitialTaskState());

//   const categories = ['Work', 'Personal', 'Shopping', 'Health', 'Learning', 'Finance', 'Home', 'Other'];
//   const priorities = ['Low', 'Medium', 'High'];

  // Initialize tasks from localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    const tasksToLoad = storedTasks ? JSON.parse(storedTasks) : initialTasks;
    
    setTasks(tasksToLoad);
    
    if (!storedTasks) {
      localStorage.setItem('tasks', JSON.stringify(initialTasks));
    }
  }, []);

  // Helper functions
  function getInitialTaskState() {
    return {
      title: "",
      description: "",
      category: "Work",
      priority: "Medium",
      dueDate: ""
    };
  }

  function getUserTasks() {
    if (!currentUser) return [];
    return tasks.filter(task => task.userId === currentUser.id);
  }

  function getTodoTasks() {
    return getUserTasks().filter(task => !task.completed);
  }

  function getCompletedTasks() {
    return getUserTasks().filter(task => task.completed);
  }

  function filterTaskList(taskList) {
    return taskList.filter(task => {
      const matchesSearch = 
        task.title.toLowerCase().includes(searchText.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchText.toLowerCase());
      
      const matchesCategory = filterCategory === "All" || task.category === filterCategory;
      const matchesPriority = filterPriority === "All" || task.priority === filterPriority;

      return matchesSearch && matchesCategory && matchesPriority;
    });
  }

  function updateTasksInStorage(updatedTasks) {
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  // Task operations
  function addTask() {
    if (!newTask.title.trim()) {
      alert("Please enter a task title");
      return;
    }

    const taskToAdd = {
      id: Date.now(),
      userId: currentUser.id,
      title: newTask.title,
      description: newTask.description,
      category: newTask.category,
      priority: newTask.priority,
      completed: addToCompleted,
      createdAt: new Date().toISOString().split('T')[0],
      dueDate: newTask.dueDate || new Date().toISOString().split('T')[0]
    };

    updateTasksInStorage([...tasks, taskToAdd]);
    setNewTask(getInitialTaskState());
    setShowAddModal(false);
  }

  function toggleTaskCompletion(taskId) {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    updateTasksInStorage(updatedTasks);
  }

  function deleteTask(taskId) {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      updateTasksInStorage(updatedTasks);
    }
  }

  function openAddModal(isCompleted) {
    setAddToCompleted(isCompleted);
    setShowAddModal(true);
  }

  // Filtered task lists
  const filteredTodoTasks = filterTaskList(getTodoTasks());
  const filteredCompletedTasks = filterTaskList(getCompletedTasks());

  return (
    <>
      <h2>Welcome, {currentUser?.name}</h2>
      
      <FilterControls
        searchText={searchText}
        setSearchText={setSearchText}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
        categories={categories}
        priorities={priorities}
      />

      <div className="board">
        <TaskColumn
          title="Todo"
          tasks={filteredTodoTasks}
          onAddClick={() => openAddModal(false)}
          onToggle={toggleTaskCompletion}
          onDelete={deleteTask}
        />

        <TaskColumn
          title="Completed"
          tasks={filteredCompletedTasks}
          onAddClick={() => openAddModal(true)}
          onToggle={toggleTaskCompletion}
          onDelete={deleteTask}
          isCompleted
        />
      </div>

      {showAddModal && (
        <AddTaskModal
          newTask={newTask}
          setNewTask={setNewTask}
          categories={categories}
          priorities={priorities}
          onAdd={addTask}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </>
  );
};

// Filter Controls Component
function FilterControls({ 
  searchText, 
  setSearchText, 
  filterCategory, 
  setFilterCategory, 
  filterPriority, 
  setFilterPriority,
  categories,
  priorities
}) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="search-input"
      />
      
      <select 
        value={filterCategory} 
        onChange={(e) => setFilterCategory(e.target.value)}
        className="filter-select"
      >
        <option value="All">All Categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      
      <select 
        value={filterPriority} 
        onChange={(e) => setFilterPriority(e.target.value)}
        className="filter-select"
      >
        <option value="All">All Priorities</option>
        {priorities.map(pri => (
          <option key={pri} value={pri}>{pri}</option>
        ))}
      </select>
    </div>
  );
}

// Task Column Component
function TaskColumn({ title, tasks, onAddClick, onToggle, onDelete, isCompleted = false }) {
  return (
    <div className="box">
      <div className="box-header">
        <h3>{title}</h3>
        <button onClick={onAddClick}>+</button>
      </div>
      
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          isCompleted={isCompleted}
        />
      ))}
    </div>
  );
}

// Task Item Component
function TaskItem({ task, onToggle, onDelete, isCompleted }) {
  return (
    <div className={`item ${isCompleted ? 'completed-item' : ''}`}>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => onToggle(task.id)}
      />
      <div className="task-content">
        <span className="task-title">{task.title}</span>
      </div>
      <button 
        className="delete-btn" 
        onClick={() => onDelete(task.id)}
      >
        ×
      </button>
    </div>
  );
}

// Add Task Modal Component
function AddTaskModal({ newTask, setNewTask, categories, priorities, onAdd, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Add New Task</h3>
        
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            placeholder="Enter task title"
            autoFocus
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            placeholder="Enter task description"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select
              value={newTask.category}
              onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            >
              {priorities.map(pri => (
                <option key={pri} value={pri}>{pri}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="modal-actions">
          <button onClick={onClose} className="btn-cancel">
            Cancel
          </button>
          <button onClick={onAdd} className="btn-add">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;