import React, { useState } from 'react';
import axios from 'axios'; // Import Axios or your preferred HTTP client
import { useNavigate } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

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
    <div id = "signupFull">
      <div id = "signupPage">
        <h2>Creare cont</h2>
        {exists && <p>Utilizator existent!</p> }
        <form onSubmit={handleFormSubmit}>
          <input id = "numeSignup"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
          />
          <input id = "emailSignup"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          <input id = "parolaSignup"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
          />
          <button id = "butonSignup" type="submit">Sign Up</button>
        </form>
        <GoogleAuth />
        <div>
            <p id = "signupQ" >Ai deja un cont? <a style={{color: 'blue'}} href="/login">Apasa aici!</a></p>
        </div>
      </div>
    </div>  
  );
}

export default Signup;
