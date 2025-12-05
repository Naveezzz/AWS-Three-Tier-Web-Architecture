// application-code/web-tier/src/components/Dashboard.jsx
import React from 'react';

const Dashboard = ({ user, onLogout }) => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
      
      <div className="user-info">
        <h3>Welcome Back!</h3>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User ID:</strong> {user.id}</p>
        <p><strong>Account Created:</strong> {new Date(user.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</p>
      </div>

      <div className="user-info">
        <h3>Account Details</h3>
        <p>
          You have successfully logged into your account. This is your personal 
          dashboard where you can view your profile information.
        </p>
        <p>
          This application demonstrates a 3-tier architecture with React frontend, 
          Node.js backend, and MySQL database running on AWS infrastructure.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;