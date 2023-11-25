import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../utils/AuthContext';
import GoogleAuth from './GoogleAuth';
import BlackChurch from '../img/biserica-neagra.jpg'


export default function Login()
{
  const { login } = useAuth()

    const [loginData, setLoginData] = useState({
        name: '',
        password: '',
      });
      
    const[response, setResponse] = useState()

      const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        try {
          await axios.post('/login', loginData).then(res =>
          {
              setResponse(res.data)
          });
  
          
        } catch (error) {
          // Handle errors, e.g., show an error message to the user
          console.error(error);
        }
      };
    
      useEffect(() => {
        if (response === "Logged in") {
          login(loginData.name)
        }
      }, [response, loginData.name, login]);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
          ...loginData,
          [name]: value,
        });
      };

    return(
      <div id = "loginFull">
        <div id = "loginImageContainer">
          <label>BVent</label>
          <img id='loginImage' src={BlackChurch} alt='black' />
          
        </div>
        <div id = "loginPage">
            <h2>Accesare cont</h2>
              
              <form onSubmit={handleFormSubmit} id = 'loginForm'>
                <input id = "numeLogin" onChange={handleInputChange} name="name" type="text" placeholder="Nume" required/> 
                <input id = "parolaLogin" onChange={handleInputChange} name="password" type="password" placeholder="Parolă" required/> 
                <p>{response && response}</p>
                  <input id = "butonLogin" type="submit" value="Log in"/>
              </form>
              <GoogleAuth />
              <div>
                  <p id = "loginQ" >Nu ai cont? <a style={{color: 'blue'}} href="/signup">Apasă aici!</a></p>
              </div>

        </div>
      </div>
    )
}