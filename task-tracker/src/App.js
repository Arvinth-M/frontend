import React, { useState, useEffect } from 'react';
import './App.css';
import Registration from './components/Registration';
import TaskTracker from './components/TaskTracker';
import Profile from './components/Profile';

function App() {
  // Load user data from localStorage on app start
  const [currentView, setCurrentView] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? 'taskTracker' : 'registration';
  });
  
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [showProfile, setShowProfile] = useState(false);

  // Save user data to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }, [user]);

  const handleRegister = (userData) => {
    setUser(userData);
    setCurrentView('taskTracker');
  };

  const handleShowProfile = () => {
    setShowProfile(true);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem(`tasks_${user.userId}`);
    setUser(null);
    setCurrentView('registration');
  };

  return (
    <div className="App">
      {currentView === 'registration' && (
        <Registration onRegister={handleRegister} />
      )}
      
      {currentView === 'taskTracker' && user && (
        <TaskTracker user={user} onShowProfile={handleShowProfile} onLogout={handleLogout} />
      )}
      
      {showProfile && (
        <Profile user={user} onClose={handleCloseProfile} />
      )}
    </div>
  );
}

export default App;