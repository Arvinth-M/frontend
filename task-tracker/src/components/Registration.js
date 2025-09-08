import React, { useState } from 'react';

const Registration = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    name: '',
    address: '',
    country: '',
    pinCode: '',
    email: '',
    sex: '',
    language: [],
    about: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'language') {
        setFormData(prev => ({
          ...prev,
          language: checked 
            ? [...prev.language, value]
            : prev.language.filter(lang => lang !== value)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if all required fields are filled
    if (!formData.userId || !formData.password || !formData.name || !formData.address || 
        !formData.country || !formData.pinCode || !formData.email || !formData.sex || 
        formData.language.length === 0) {
      alert("Please fill in all fields before submitting.");
      return;
    }
    
    alert("Registration Successful!");
    onRegister(formData);
  };

  return (
    <div className="registration-container">
      <h2>Registration Form</h2>
      <form id="registrationForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userId">User id:</label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleInputChange}
          />
        </div>
        
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
        
        <div>
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          >
            <option value="">(Please select a country)</option>
            <option value="India">INDIA</option>
            <option value="USA">USA</option>
            <option value="South Africa">South Africa</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="pinCode">Pin Code:</label>
          <input
            type="text"
            id="pinCode"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleInputChange}
          />
        </div>
        
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        
        <div>
          <label>Sex:</label>
          <input
            type="radio"
            id="male"
            name="sex"
            value="Male"
            checked={formData.sex === 'Male'}
            onChange={handleInputChange}
          />
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            id="female"
            name="sex"
            value="Female"
            checked={formData.sex === 'Female'}
            onChange={handleInputChange}
          />
          <label htmlFor="female">Female</label>
        </div>
        
        <div>
          <label>Language:</label>
          <input
            type="checkbox"
            id="english"
            name="language"
            value="English"
            checked={formData.language.includes('English')}
            onChange={handleInputChange}
          />
          <label htmlFor="english">English</label>
          <input
            type="checkbox"
            id="tamil"
            name="language"
            value="Tamil"
            checked={formData.language.includes('Tamil')}
            onChange={handleInputChange}
          />
          <label htmlFor="tamil">Tamil</label>
        </div>
        
        <div>
          <label htmlFor="about">About:</label>
          <textarea
            id="about"
            name="about"
            rows="4"
            cols="30"
            value={formData.about}
            onChange={handleInputChange}
          ></textarea>
        </div>
        
        <div>
          <label></label>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
