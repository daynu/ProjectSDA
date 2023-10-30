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
      // Send a POST request to your Express.js server
      const response = await axios.post('/signup', formData);

      // Handle the response, e.g., show a success message to the user
      console.log(response.data);
    } catch (error) {
      // Handle errors, e.g., show an error message to the user
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