import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";
import { useUsers } from "../context/UserContext";
import { categories } from "../data/categories";
import { priorities } from "../data/priorities";

const Dashboard = () => {
  const { user } = useAuth();
  const { getUserByEmail } = useUsers();
  const {
    getTodoTasks,
    getCompletedTasks,
    addTask,
    toggleTaskCompletion,
    deleteTask,
    filterTasks,
    isLoading
  } = useTasks();

  const currentUser = getUserByEmail(user.email);
  
  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [addToCompleted, setAddToCompleted] = useState(false);
  const [newTask, setNewTask] = useState(getInitialTaskState());

  function getInitialTaskState() {
    return {
      title: "",
      description: "",
      category: "Work",
      priority: "Medium",
      dueDate: ""
    };
  }

  const getFilteredTasks = (completed) => {
    if (!currentUser) return [];
    
    const userTasks = completed 
      ? getCompletedTasks(currentUser.id)
      : getTodoTasks(currentUser.id);

    return userTasks.filter(task => {
      const matchesSearch = 
        task.title.toLowerCase().includes(searchText.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchText.toLowerCase());
      
      const matchesCategory = filterCategory === "All" || task.category === filterCategory;
      const matchesPriority = filterPriority === "All" || task.priority === filterPriority;

      return matchesSearch && matchesCategory && matchesPriority;
    });
  };

  function handleAddTask() {
    if (!newTask.title.trim()) {
      alert("Please enter a task title");
      return;
    }

    const taskToAdd = {
      userId: currentUser.id,
      title: newTask.title,
      description: newTask.description,
      category: newTask.category,
      priority: newTask.priority,
      completed: addToCompleted,
      dueDate: newTask.dueDate
    };

    addTask(taskToAdd);
    setNewTask(getInitialTaskState());
    setShowAddModal(false);
  }

  function handleToggleTask(taskId) {
    toggleTaskCompletion(taskId);
  }

  function handleDeleteTask(taskId) {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(taskId);
    }
  }

  function openAddModal(isCompleted) {
    setAddToCompleted(isCompleted);
    setShowAddModal(true);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Filtered task lists
  const filteredTodoTasks = getFilteredTasks(false);
  const filteredCompletedTasks = getFilteredTasks(true);

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
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
        />

        <TaskColumn
          title="Completed"
          tasks={filteredCompletedTasks}
          onAddClick={() => openAddModal(true)}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          isCompleted
        />
      </div>

      {showAddModal && (
        <AddTaskModal
          newTask={newTask}
          setNewTask={setNewTask}
          categories={categories}
          priorities={priorities}
          onAdd={handleAddTask}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </>
  );
};

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