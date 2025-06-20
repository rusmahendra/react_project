import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarNav from '../include/Sidebar';

import '../css/style.css';

function Dashoard() {
  const navigate = useNavigate();

 


  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <SidebarNav />

      {/* Main Content */}
      <div className="main-content">
        <h1>Dashboard</h1>
        <p>Welcome to the dashboard!</p>
         <div className="dashboard-boxes">
    <div className="dashboard-box">
      <h3>Total Users</h3>
      <p>150</p>
    </div>
    <div className="dashboard-box">
      <h3>Active Products</h3>
      <p>45</p>
    </div>
    <div className="dashboard-box">
      <h3>Orders</h3>
      <p>120</p>
    </div>
    <div className="dashboard-box">
      <h3>Revenue</h3>
      <p>$24,000</p>
    </div>
  </div>
      </div>
    </div>
  );
}

export default Dashoard;
