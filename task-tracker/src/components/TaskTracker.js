import React, { useState, useEffect } from 'react';

const TaskTracker = ({ user, onShowProfile, onLogout }) => {
  // Load tasks from localStorage on component mount
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem(`tasks_${user.userId}`);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editValue, setEditValue] = useState('');

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem(`tasks_${user.userId}`, JSON.stringify(tasks));
  }, [tasks, user.userId]);

  const addTask = () => {
    if (newTask.trim() === '') return;

    const task = {
      id: Date.now(),
      text: newTask,
      completed: false
    };

    setTasks([...tasks, task]);
    setNewTask('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const startEdit = (id, text) => {
    setEditingTaskId(id);
    setEditValue(text);
  };

  const saveEdit = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: editValue } : task
    ));
    setEditingTaskId(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="task-tracker-container">
      <div className="header">
        <h1>Task Tracker</h1>
        <div className="header-actions">
          <button className="logout-btn" onClick={onLogout}>Logout</button>
          <div className="profile-icon" onClick={onShowProfile} title="View Profile">
            <div className="profile-circle">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
      
      <div className="container">
        <p>
          <label htmlFor="new-task" className="middle">Add Task</label>
          <input
            id="new-task"
            type="text"
            placeholder="Enter a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyUp={handleKeyPress}
          />
          <button id="add-task-btn" onClick={addTask}>Add Task</button>
        </p>

        <h3 className="middle">Todo</h3>
        <ul id="incomplete-tasks">
          {incompleteTasks.map(task => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              {editingTaskId === task.id ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  style={{ display: 'block' }}
                />
              ) : (
                <label>{task.text}</label>
              )}
              {editingTaskId === task.id ? (
                <>
                  <button onClick={() => saveEdit(task.id)}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <button className="edit" onClick={() => startEdit(task.id, task.text)}>
                  Edit
                </button>
              )}
              <button className="delete" onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>

        <h3 className="middle">Completed Tasks</h3>
        <ul id="completed-tasks">
          {completedTasks.map(task => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              <label>{task.text}</label>
              <button className="delete" onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskTracker;
