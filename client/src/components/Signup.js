import React, { useState } from 'react';
import axios from 'axios'; // Import Axios or your preferred HTTP client
import { useNavigate } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import BlackChurch from '../img/biserica-neagra.jpg'

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
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup`, formData)

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
    <div id = "signupImageContainer">
        <label>BVent</label>
        <img id='signupImage' src={BlackChurch} alt='black' />
          
    </div>


      <div id = "signupPage">
        <h2>Creare cont</h2>
        
        <form onSubmit={handleFormSubmit} id = "signupForm">
          <input id = "numeSignup"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Nume"
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
            placeholder="Parolă"
            required
          />
          {exists && <p>Utilizator existent!</p> }
          <button id = "butonSignup" type="submit">Sign Up</button>
        </form>
        <GoogleAuth />
        <div>
            <p id = "signupQ" >Ai deja un cont? <a style={{color: 'blue'}} href="/login">Apasă aici!</a></p>
        </div>
      </div>
    </div>  
  );
}

export default Signup;
