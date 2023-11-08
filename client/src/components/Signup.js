import React, { useState } from 'react';
import axios from 'axios'; // Import Axios or your preferred HTTP client
import { useNavigate } from 'react-router-dom';

function Signup() {

  const history = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

const [exists, setExists] = useState(false)

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/signup', formData)

      const data = response.data

      console.log(data)

      if(data === "exists")
      {
        setExists(true)
      }
      else
      {
        history("/login")
        setExists(false)
      }

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
    {exists && <p>User already exists</p> }
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Password"
        required
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
