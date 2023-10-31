import React, { useState } from 'react';
import axios from 'axios'; // Import Axios or your preferred HTTP client

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/signup', formData).then(res =>
        {
          if(res.data === "exists")
          {
            alert("User already exists")
          }
        });

      console.log(response.data);
    } catch (error) {
     
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
    <h2>Sign Up</h2>
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Password"
      />
      <button type="submit">Sign Up</button>
    </form>
    <div>
        <p>Already have an account? <a style={{color: 'blue'}} href="/login">Click here to log in</a></p>
    </div>
    </>
  );
}

export default Signup;