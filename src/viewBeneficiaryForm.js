import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 👈 import this
import './viewBeneficiaryForm.css';

const ViewBeneficiaryForm = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // 👈 hook for programmatic navigation

  useEffect(() => {
    axios.get("http://localhost:4000/api/beneficiaries")
      .then((response) => {
        console.log("API Response in React:", response.data);
        setBeneficiaries(response.data);
      })
      .catch((error) => console.error("Error fetching beneficiaries:", error));
  }, []);

  const fetchBeneficiary = (id) => {
    axios.get(`http://localhost:4000/api/beneficiaries/${id}`)
      .then((response) => setSelectedBeneficiary(response.data))
      .catch((error) => console.error("Error fetching beneficiary:", error));
  };

  const handleProjectView = (id) => {
    navigate(`/beneficiary-projects/${id}`); // 👈 go to the new page
  };

  const filteredBeneficiaries = beneficiaries.filter((b) =>
    Object.values(b).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div>
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search in all fields..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button className="search-button">Search</button>
      </div>

      <h1 className="h1">Beneficiaries List</h1>
      
      <table className="table" border="1">
        <thead>
          <tr>
            <th>Form Number</th>
            <th>Kata</th>
            <th>Mtaa</th>
            <th>Kiongozi Mtaa Name</th>
            <th>Afisa Name</th>
            <th>Full Name</th> 
            <th>Gender</th>         
            <th>Phone</th>
            <th>Housing Ownership</th>
            <th>Date of Birth</th>          
            <th>Basic Services</th>        
            <th>Income Level</th>        
            <th>Education Level</th>     
            <th>Disabilities</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredBeneficiaries.map((b) => (
            <tr key={b.id}>
              <td>{b.form_number || "N/A"}</td>            
              <td>{b.kata || "N/A"}</td>
              <td>{b.mtaa || "N/A"}</td>
              <td>{b.kiongozi_mtaa_name || "N/A"}</td>            
              <td>{b.afisa_name || "N/A"}</td>             
              <td>{b.full_name || "N/A"}</td>
              <td>{b.gender || "N/A"}</td>
              <td>{b.phone_number || "N/A"}</td>
              <td>{b.housing_ownership || "N/A"}</td>
              <td>{b.date_of_birth || "N/A"}</td>
              <td>{JSON.stringify(b.basic_services) || "N/A"}</td>
              <td>{b.income_level || "N/A"}</td>
              <td>{b.education_level || "N/A"}</td>
              <td>{b.disabilities || "N/A"}</td>
              <td>
                <button className="viewbutton" onClick={() => fetchBeneficiary(b.id)}>View</button>
                <button className="viewbutton" onClick={() => handleProjectView(b.id)} style={{ marginLeft: '6px', backgroundColor: '#4CAF50' }}>
                  View Projects
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedBeneficiary && (
        <div className="selectedBeneficiary">
          <h2><u>Beneficiary Details</u></h2>
          {Object.entries(selectedBeneficiary).map(([key, value]) => (
            <p key={key}>
              <strong>{key.replace(/_/g, " ")}:</strong> {typeof value === "object" ? JSON.stringify(value) : value}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewBeneficiaryForm;
