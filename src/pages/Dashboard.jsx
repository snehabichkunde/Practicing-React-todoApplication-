import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { categories } from "../data/categories";
import { priorities } from "../data/priorities";
import {useDebounce} from "../hooks/useDebounce"

const Dashboard = ({ taskApi, userApi }) => {
  const { user } = useAuth();
  const { getUserByEmail } = userApi; 
  const {
    getTodoTasks,
    getCompletedTasks,
    addTask,
    toggleTaskCompletion,
    deleteTask,
    filterTasks,
    isLoading
  } = taskApi; 

  const currentUser = getUserByEmail(user.email);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState({
    searchText: "",
    filterCategory: "All",
    filterPriority: "All"
  });
  const [debouncedSearchText, isSearching] = useDebounce(filter.searchText);

  const [addNewTask, setAddNewTask] = useState({
      newTask: getInitialTaskState(),
      addToCompleted: false
  })

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
        task.title.toLowerCase().includes(debouncedSearchText.toLowerCase()) ||
        task.description?.toLowerCase().includes(debouncedSearchText.toLowerCase());
      
      const matchesCategory = filter.filterCategory === "All" || task.category === filter.filterCategory;
      const matchesPriority = filter.filterPriority === "All" || task.priority === filter.filterPriority;

      return matchesSearch && matchesCategory && matchesPriority;
    });
  };

  function handleAddTask() {
    if (!addNewTask.newTask.title.trim()) {
      alert("Please enter a task title");
      return;
    }

    const taskToAdd = {
      userId: currentUser.id,
      title: addNewTask.newTask.title,
      description: addNewTask.newTask.description,
      category: addNewTask.newTask.category,
      priority: addNewTask.newTask.priority,
      completed: addNewTask.addToCompleted,
      dueDate: addNewTask.newTask.dueDate
    };

    addTask(taskToAdd);
    setAddNewTask(prev => ({
      ...prev,
      newTask: getInitialTaskState()
    }));
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
    setAddNewTask(prev => ({
      ...prev,
      addToCompleted: isCompleted
    }));
    setShowAddModal(true);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const filteredTodoTasks = getFilteredTasks(false);
  const filteredCompletedTasks = getFilteredTasks(true);

  return (
    <>
      <h2>Welcome, {currentUser?.name}</h2>
      
      <FilterControls
        filter={filter}
        setFilter={setFilter}
        isSearching={isSearching}
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
          isSearching={isSearching && filter.searchText}
        />

        <TaskColumn
          title="Completed"
          tasks={filteredCompletedTasks}
          onAddClick={() => openAddModal(true)}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          isCompleted
          isSearching={isSearching && filter.searchText}
        />
      </div>

      {showAddModal && (
        <AddTaskModal
          newTask={addNewTask.newTask}
          setNewTask={(value) => setAddNewTask(prev => ({ ...prev, newTask: value }))}
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
  filter,
  setFilter,
  isSearching,
  categories,
  priorities
}) {
  const handleFilterChange = (field, value) => {
    setFilter(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="filters">
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search tasks..."
          value={filter.searchText}
          onChange={(e) => handleFilterChange('searchText', e.target.value)}
          className="search-input"
        />
        {isSearching && filter.searchText && (
          <span className="search-loader">Searching...</span>
        )}
      </div>
      <select 
        value={filter.filterCategory} 
        onChange={(e) => handleFilterChange('filterCategory', e.target.value)}
        className="filter-select"
      >
        <option value="All">All Categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <select 
        value={filter.filterPriority} 
        onChange={(e) => handleFilterChange('filterPriority', e.target.value)}
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
function TaskColumn({ title, tasks, onAddClick, onToggle, onDelete, isCompleted = false, isSearching }) {
  return (
    <div className="box">
      <div className="box-header">
        <h3>{title}</h3>
        <button onClick={onAddClick}>+</button>
      </div>
      
      {isSearching ? (
        <div className="loading-tasks">Searching...</div>
      ) : (
        tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            isCompleted={isCompleted}
          />
        ))
      )}
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