// application-code/web-tier/src/App.jsx
import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleSignupSuccess = () => {
    setCurrentPage('login');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
  };

  return (
    <div className="App">
      {currentPage === 'login' && (
        <Login 
          onLoginSuccess={handleLoginSuccess}
          onSwitchToSignup={() => setCurrentPage('signup')}
        />
      )}
      {currentPage === 'signup' && (
        <Signup 
          onSignupSuccess={handleSignupSuccess}
          onSwitchToLogin={() => setCurrentPage('login')}
        />
      )}
      {currentPage === 'dashboard' && (
        <Dashboard 
          user={user}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;