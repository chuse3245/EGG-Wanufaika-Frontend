import React, { useState } from 'react';
import './beneficiaryForm.css'; // Import the CSS file
import logo from "./assets/logo.png";
import { useNavigate } from "react-router-dom";


const BeneficiaryForm = () => {
  const [formData, setFormData] = useState({
    formNumber: '',
    mji: '',
    wilaya: '',
    kata: '',
    mtaa: '',
    kiongoziMtaaName: '',
    kiongoziMtaaPhone: '',
    afisaName: '',
    afisaCheo: '',
    afisaPhone: '',
    fullName: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    email: '',
    maritalStatus: '',
    householdSize: '',
    housingType: '',
    housingOwnership: '',
    rentAmount: '',
    rentPayer: '',
    rentPayerName: '',
    rentPayerRelationship: '',
    basicServices: {
      water: false,
      electricity: false,
      toilet: false,
    },
    energySource:{
      gas:false,
      firewood:false,
      charcoal:false,
    },
    houseCapacity: '',
    bedrooms: '',
    incomeLevel: '',
    incomeSource: '',
    educationLevel: '',
    dependents: [],
    healthInfo: {
      specialHealthCondition: '',
      specialHealthConditionDetails: '',
      disability: '',
      disabilityDetails: '',
      healthServices: '',
      otherHealthServices: '',
    },
    challenges: '',
    servicePriority: '',
    serviceRecommendations: ['', '', '', '', ''],
    fillingDate: '',
    hasBenefited:'no',
    infoWriters: [
      { name: '', signature: '' },
      { name: '', signature: '' },
      { name: '', signature: '' },
    ],
  });
  
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
  if (type === "checkbox") {
    // ✅ Handle checkboxes in `basicServices`
    if (["water", "electricity", "toilet"].includes(name)) {
      setFormData({
        ...formData,
        basicServices: {
          ...formData.basicServices,
          [name]: checked,
        },
      });
    }
    // ✅ Handle checkboxes in `energySource`
    else if (["gas", "firewood", "charcoal"].includes(name)) {
      setFormData({
        ...formData,
        energySource: {
          ...formData.energySource,
          [name]: checked,
        },
      });
    }
  } else {
    // ✅ Handle other input fields
    setFormData({
      ...formData,
      [name]: value,
    });
  }
};

  const handleDependentChange = (index, field, value) => {
    const updatedDependents = [...formData.dependents];
    updatedDependents[index][field] = value;
    setFormData({
      ...formData,
      dependents: updatedDependents,
    });
  };

  const addDependent = () => {
    setFormData({
      ...formData,
      dependents: [...formData.dependents, { name: '', relationship: '', age: '', status: '' }],
    });
  };
 const handleHealthInfoChange = (field, value) => {
  setFormData((prev) => ({
    ...prev,
    healthInfo: {
      ...prev.healthInfo,
      [field]: value,
      ...(field === 'specialHealthCondition' && value === 'yes'
        ? { specialHealthConditionDetails: prev.healthInfo.specialHealthConditionDetails }
        : {}),
      ...(field === 'disability' && value === 'yes'
        ? { disabilityDetails: prev.healthInfo.disabilityDetails }
        : {}),
      ...(field === 'healthServices' && value !== 'NYINGINE'
        ? { otherHealthServices: '' }
        : {}),
    },
  }));
};


  const handleServiceRecommendationChange = (index, value) => {
    const updatedRecommendations = [...formData.serviceRecommendations];
    updatedRecommendations[index] = value;
    setFormData({
      ...formData,
      serviceRecommendations: updatedRecommendations,
    });
  };

  const handleInfoWriterChange = (index, field, value) => {
    const updatedWriters = [...formData.infoWriters];
    updatedWriters[index][field] = value;
    setFormData({
      ...formData,
      infoWriters: updatedWriters,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formattedData = {
      ...formData,
      healthNeeds: formData.healthInfo.specialHealthCondition === 'yes' ? 'yes' : 'no',  // Ensure valid ENUM value
      healthNeedsDetails: formData.healthInfo.specialHealthCondition === 'yes' ? formData.healthInfo.specialHealthConditionDetails : '',
      disabilities: formData.healthInfo.disability === 'yes' ? 'yes' : 'no',  // Ensure valid ENUM value
      disabilitiesDetails: formData.healthInfo.disability === 'yes' ? formData.healthInfo.disabilityDetails : '',
      healthServices: formData.healthInfo.healthServices,
      otherHealthServices: formData.healthInfo.otherHealthServices,
      basicServices: JSON.stringify(formData.basicServices),
      energySourceServices: JSON.stringify(formData.energySource),
      servicePriorities: JSON.stringify(formData.servicePriority),
      AfisaServicePriorities: JSON.stringify(formData.serviceRecommendations),
      has_benefited: formData.hasBenefited, // ✅ add this line
    };
  
    try {
      const response = await fetch('http://localhost:4000/api/beneficiaries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });
  
      if (response.ok) {
        alert('Data saved successfully!');
        navigate("/dashboard"); // Redirect after saving
      } else {
        alert('Failed to save data.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form.');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
     
        
        <form onSubmit={handleSubmit} className="form-container">
        <img src={logo} alt="Company Logo" className="form-logo" />
        <h1 className="text-2xl font-bold mb-6 text-center"><u>Fomu Ya Ukusanyaji Wa Taarifa Za Wanufaika</u></h1>
         
      
       {/*above all information section*/}
       <section >
            <h2 className="text-xl font-semibold mb-4">TAARIFA ZA MTAA NA AFISA</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Fomu Namba</label>
                <input
                  type="text"
                  name="formNumber"
                  value={formData.formNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mji</label>
                <input
                  type="text"
                  name="mji"
                  value={formData.mji}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Wilaya</label>
                <input
                  type="text"
                  name="wilaya"
                  value={formData.wilaya}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Kata</label>
                <input
                  type="text"
                  name="kata"
                  value={formData.kata}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mtaa</label>
                <input
                  type="text"
                  name="mtaa"
                  value={formData.mtaa}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Jina la Kiongozi wa Mtaa</label>
                <input
                  type="text"
                  name="kiongoziMtaaName"
                  value={formData.kiongoziMtaaName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Namba ya Simu ya Kiongozi wa Mtaa</label>
                <input
                  type="text"
                  name="kiongoziMtaaPhone"
                  value={formData.kiongoziMtaaPhone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Jina la Afisa</label>
                <input
                  type="text"
                  name="afisaName"
                  value={formData.afisaName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cheo cha Afisa</label>
                <input
                  type="text"
                  name="afisaCheo"
                  value={formData.afisaCheo}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Namba ya Simu ya Afisa</label>
                <input
                  type="text"
                  name="afisaPhone"
                  value={formData.afisaPhone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </section>
          {/* Personal Information Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">1. TAARIFA BINAFSI ZA MNUFAIKA</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Jina Kamili</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tarehe ya Kuzaliwa</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700">Jinsia</label>
                <div className="mt-1">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === 'male'}
                      onChange={handleChange}
                      className="form-radio"
                    />
                    <span className="ml-2">Me</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === 'female'}
                      onChange={handleChange}
                      className="form-radio"
                    />
                    <span className="ml-2">Ke</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Namba za Simu</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Barua Pepe (ikiwa ipo)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Hali ya Ndoa</label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Chagua</option>
                  <option value="married">Ameoa/Ameolewa</option>
                  <option value="single">Hajaoa/Hajaolewa</option>
                  <option value="widowed">Mjane/Mgane</option>
                </select>
              </div>
            </div>
          </section>

          {/* Social Information Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">2. TAARIFA ZA KIJAMII</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Idadi ya Watu wa Kaya</label>
                <input
                  type="number"
                  name="householdSize"
                  value={formData.householdSize}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Hali ya Makazi</label>
                <select
                  name="housingType"
                  value={formData.housingType}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Chagua</option>
                  <option value="permanent">Nyumba ya kudumu</option>
                  <option value="temporary">Nyumba ya muda</option>
                  <option value="other">Makazi ya aina nyingine</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700">Umiliki wa Makazi</label>
                <div className="mt-1">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="housingOwnership"
                      value="own"
                      checked={formData.housingOwnership === 'own'}
                      onChange={handleChange}
                      className="form-radio"
                    />
                    <span className="ml-2">Nyumba yake mwenyewe</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      name="housingOwnership"
                      value="rent"
                      checked={formData.housingOwnership === 'rent'}
                      onChange={handleChange}
                      className="form-radio"
                    />
                    <span className="ml-2">Nyumba ya Kupanga</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Kiasi cha fedha kinacholipwa kwa ajili ya kodi</label>
                <input
                  type="number"
                  name="rentAmount"
                  value={formData.rentAmount}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700">Analipia kodi kwa mwenye nyumba yeye mwenyewe</label>
                <div className="mt-1">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="rentPayer"
                      value="self"
                      checked={formData.rentPayer === 'self'}
                      onChange={handleChange}
                      className="form-radio"
                    />
                    <span className="ml-2">Ndiyo</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      name="rentPayer"
                      value="other"
                      checked={formData.rentPayer === 'other'}
                      onChange={handleChange}
                      className="form-radio"
                    />
                    <span className="ml-2">Hapana</span>
                  </label>
                </div>
              </div>
              {formData.rentPayer === 'other' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Jina la mtu anayekulipia kodi</label>
                  <input
                    type="text"
                    name="rentPayerName"
                    value={formData.rentPayerName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              )}
              {formData.rentPayer === 'other' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mahusiano yako na anayekulipia kodi</label>
                  <input
                    type="text"
                    name="rentPayerRelationship"
                    value={formData.rentPayerRelationship}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              )}
            </div>
          </section>

          {/* Basic Services Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">3. MIUNDOMBINU YA MAKAZI</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Upatikanaji wa huduma za msingi</label>
                <div className="mt-1">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="water"
                      checked={formData.basicServices.water}
                      onChange={handleChange}
                      className="form-checkbox"
                    />
                    <span className="ml-2">Maji</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="checkbox"
                      name="electricity"
                      checked={formData.basicServices.electricity}
                      onChange={handleChange}
                      className="form-checkbox"
                    />
                    <span className="ml-2">Umeme</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="checkbox"
                      name="toilet"
                      checked={formData.basicServices.toilet}
                      onChange={handleChange}
                      className="form-checkbox"
                    />
                    <span className="ml-2">Vyoo</span>
                  </label>
                  </div>
            </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Upatikanaji wa nishati ya kupikia</label>
                <div className="mt-1">
                <label className="inline-flex items-center ml-6">
                <input
                  type="checkbox"
                  name="gas"
                  value={formData.energySource.gas}
                  onChange={handleChange}
                  className="form-checkbox"   
                  />
                  <span className="ml-2">Gesi</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="checkbox"
                  name="firewood"
                  value={formData.energySource.firewood}
                  onChange={handleChange}
                  className="form-checkbox"   
                  />
                  <span className="ml-2">Kuni</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="checkbox"
                  name="charcoal"
                  value={formData.energySource.charcoal}
                  onChange={handleChange}
                  className="form-checkbox"   
                  />
                  <span className="ml-2">Mkaa</span>
              </label>
             </div>
              </div>
            </div>
            
          </section>

          {/* House Capacity Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Ukubwa na Mahitaji ya Makazi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-700">Uwezo wa nyumba kuhifadhi wanakaya wote kwa usalama na faragha</label>
                <div className="mt-1">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="houseCapacity"
                      value="yes"
                      checked={formData.houseCapacity === 'yes'}
                      onChange={handleChange}
                      className="form-radio"
                    />
                    <span className="ml-2">Ndiyo</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      name="houseCapacity"
                      value="no"
                      checked={formData.houseCapacity === 'no'}
                      onChange={handleChange}
                      className="form-radio"
                    />
                    <span className="ml-2">Hapana</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Idadi ya vyumba vya kulala</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </section>

          {/* Economic Status Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">4. HALI YA KIUCHUMI</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Kiwango cha Kipato kwa mwezi</label>
                <select
                  name="incomeLevel"
                  value={formData.incomeLevel}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Chagua</option>
                  <option value="<50000">Chini ya Tsh 50,000</option>
                  <option value="50000-100000">Tsh 50,000 - 100,000</option>
                  <option value="100000-200000">Tsh 100,000 - 200,000</option>
                  <option value=">200000">Zaidi ya Tsh 200,000</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Chanzo Kikuu cha Mapato</label>
                <select
                  name="incomeSource"
                  value={formData.incomeSource}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Chagua</option>
                  <option value="farming">Kilimo</option>
                  <option value="business">Biashara ndogondogo</option>
                  <option value="employment">Ajira za muda mfupi au za kudumu</option>
                  <option value="aid">Misaada</option>
                </select>
              </div>
            </div>
          </section>

          {/* Education Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">5. KIWANGO CHA ELIMU</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Elimu</label>
                <select
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Chagua</option>
                  <option value="primary">Shule ya Msingi</option>
                  <option value="secondary4">Sekondari kidato cha nne</option>
                  <option value="secondary6">Sekondari kidato cha sita</option>
                  <option value="college">Vyuo vya kati</option>
                  <option value="university">Chuo kikuu</option>
                </select>
              </div>
            </div>
          </section>
  
   
          {/* Dependents Information Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">6. TAARIFA ZA WATEGEMEZI</h2>
            <div>
              <label>Idadi ya Watoto/Wategemezi:</label>
              <input type="number" value={formData.dependents.length} readOnly />
            </div>
            <table style={{display: 'flex',justifyContent:'center',textAlign: 'center'}}>
              <thead >
                <tr >
                  {/* <th>|Namba|</th>
                  <th>Jina|</th>
                  <th>Uhusiano|</th>
                  <th>Umri|</th>
                  <th>Hali|</th> */}
                </tr>
              </thead>
              <tbody>
                {formData.dependents.map((dependent, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <input
                        type="text"
                        placeholder='jina'
                        value={dependent.name}
                        onChange={(e) => handleDependentChange(index, 'name', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="uhusiano"
                        value={dependent.relationship}
                        onChange={(e) => handleDependentChange(index, 'relationship', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        placeholder='umri'
                        value={dependent.age}
                        onChange={(e) => handleDependentChange(index, 'age', e.target.value)}
                      />
                    </td>
                    <td>
                      <select
                      placeholder="Hali"
                        value={dependent.status}
                        onChange={(e) => handleDependentChange(index, 'status', e.target.value)}
                      >
                        <option value="">Chagua-hali</option>
                        <option value="1">Yatima – mwanafunzi</option>
                        <option value="2">Yatima si mwanafunzi</option>
                        <option value="3">Mtu mzima asiyojitegemea</option>
                        <option value="4">Ana ulemavu</option>
                        <option value="5">Ana hali nyingine</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" onClick={addDependent}>Ongeza Mtegemezi</button>
          </section>
<section>
  <h2 className="text-xl font-semibold mb-4">7. TAARIFA ZA AFYA</h2>

  {/* Special Health Condition */}
  <div>
    <label>Je, wewe au mtu yeyote wa kaya yako ana hali ya kiafya inayohitaji msada maalum?</label>
    <select
      value={formData.healthInfo.specialHealthCondition}
      onChange={(e) => handleHealthInfoChange('specialHealthCondition', e.target.value)}
    >
      <option value="">Chagua</option>
      <option value="yes">NDIYO</option>
      <option value="no">HAPANA</option>
    </select>
  </div>
  {formData.healthInfo.specialHealthCondition === 'yes' && (
    <div>
      <label>Tafadhali eleza:</label>
      <input
        type="text"
        value={formData.healthInfo.specialHealthConditionDetails}
        onChange={(e) => handleHealthInfoChange('specialHealthConditionDetails', e.target.value)}
      />
    </div>
  )}

  {/* Disability */}
  <div>
    <label>Je, wewe au mtu yeyote wa kaya yako ana hali ya ulemavu?</label>
    <select
      value={formData.healthInfo.disability}
      onChange={(e) => handleHealthInfoChange('disability', e.target.value)}
    >
      <option value="">Chagua</option>
      <option value="yes">NDIYO</option>
      <option value="no">HAPANA</option>
    </select>
  </div>
  {formData.healthInfo.disability === 'yes' && (
    <div>
      <label>Tafadhali eleza ni ulemavu wa aina gani:</label>
      <input
        type="text"
        value={formData.healthInfo.disabilityDetails}
        onChange={(e) => handleHealthInfoChange('disabilityDetails', e.target.value)}
      />
    </div>
  )}

  {/* Health Services */}
  <div>
    <label>Je, unatumia huduma gani za afya?</label>
    <select
      value={formData.healthInfo.healthServices}
      onChange={(e) => handleHealthInfoChange('healthServices', e.target.value)}
    >
      <option value="">Chagua</option>
      <option value="NHIF">NHIF</option>
      <option value="CHIF">CHIF</option>
      <option value="NYINGINE">Nyingine</option>
    </select>
  </div>
  {formData.healthInfo.healthServices === 'NYINGINE' && (
    <div>
      <label>Taja tafadhali:</label>
      <input
        type="text"
        value={formData.healthInfo.otherHealthServices}
        onChange={(e) => handleHealthInfoChange('otherHealthServices', e.target.value)}
      />
    </div>
  )}
</section>



          {/* Challenges and Expectations Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">8. CHANGAMOTO NA MATARAJIO</h2>
            <div>
              <label>Changamoto Unazokutana Nazo Katika Maisha Yako:</label>
              <textarea
                value={formData.challenges}
                onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
              />
            </div>
            <div>
              <label>Kipaumbele Chako cha Huduma:</label>
              <textarea
                value={formData.servicePriority}
                onChange={(e) => setFormData({ ...formData, servicePriority: e.target.value })}
              />
            </div>

            <h2>9. MAPENDEKEZO YA KIPAUMBELE CHA HUDUMA KWA JICHO LA MKUSANYA TAARIFA</h2>
            {formData.serviceRecommendations.map((recommendation, index) => (
              <div key={index}>
                <label>Huduma ya {index + 1}:</label>
                <input
                  type="text"
                  value={recommendation}
                  onChange={(e) => handleServiceRecommendationChange(index, e.target.value)}
                />
              </div>
            ))}

            <div>
              <label>Tarehe ya Kujaza Fomu:</label>
              <input
                type="date"
                value={formData.fillingDate}
                onChange={(e) => setFormData({ ...formData, fillingDate: e.target.value })}
              />
            </div>
            <label>
  Amefaidika na huduma?
  <select
    name="hasBenefited"
    value={formData.hasBenefited}
    onChange={handleChange}
    required
  >
    <option value="no">Hapana</option>
    <option value="yes">Ndio</option>
  </select>
</label>


            <h2>10. MWANDISHI WA TAARIFA</h2>
            {formData.infoWriters.map((writer, index) => (
              <div key={index}>
                <label>Jina la Mwandishi wa Taarifa {index + 1}:</label>
                <input
                  type="text"
                  value={writer.name}
                  onChange={(e) => handleInfoWriterChange(index, 'name', e.target.value)}
                />
                <label>Sahihi ya Mwandishi wa Taarifa {index + 1}:</label>
                <input
                  type="text"
                  value={writer.signature}
                  onChange={(e) => handleInfoWriterChange(index, 'signature', e.target.value)}
                />
              </div>
            ))}
          </section>

          <button type="submit" className="button-submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};


export default BeneficiaryForm;