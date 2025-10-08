import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css"; // Import CSS file
import logo from "./assets/logo.png";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
    <img src={logo} alt="Company Logo" className="form-logo" />
      <h1 className="dashboard-title">Welcome to the Dashboard</h1>
      <nav className="dashboard-nav">
        <ul className="dashboard-menu">
          <li><Link className="dashboard-link" to="/beneficiary"><b>➕ Add Beneficiary</b></Link></li>
          <li><Link className="dashboard-link" to="/view-beneficiaries">📋 View Beneficiaries</Link></li>
          <li>
            <button className="dashboard-logout" onClick={() => window.location.href = "/"}>
              🚪 Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
