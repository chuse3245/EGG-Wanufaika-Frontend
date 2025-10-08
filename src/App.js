import React,{useState} from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
 import BeneficiaryForm from './beneficiaryForm';
import LoginForm from './loginForm';
import Dashboard from "./Dashboard";
import ViewBeneficiaryForm from "./viewBeneficiaryForm";




function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <Routes>
          {/* If not authenticated, stay on Login Page */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginForm onAuth={setIsAuthenticated} />} />

          {/* Dashboard Route - Only accessible if authenticated */}
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard setAuth={setIsAuthenticated} /> : <Navigate to="/" />}
          />

          {/* Beneficiary Form Route - Only accessible if authenticated */}
          <Route
            path="/beneficiary"
            element={isAuthenticated ? <BeneficiaryForm /> : <Navigate to="/" />}
          />
           <Route path="/" element={<Dashboard />} />
        <Route path="/view-beneficiaries" element={<ViewBeneficiaryForm />} />
      
        </Routes>
      </header>
    </div>
  </Router>
  );
}

export default App;


