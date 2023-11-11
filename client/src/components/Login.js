import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login()
{
  const { login } = useAuth()
  const navigate = useNavigate()

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
          navigate('/')
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
        <div id = "loginPage">
            <h2>Intră în cont</h2>
              <p>{response && response}</p>
              <form onSubmit={handleFormSubmit} id = 'loginForm'>
                 <input id = "numeLogin" onChange={handleInputChange} name="name" type="text" placeholder="Nume" required/> 
                 <input id = "parolaLogin" onChange={handleInputChange} name="password" type="password" placeholder="Parolă" required/> 
                  <input id = "butonLogin" type="submit" value="Log in"/>
              </form>
              <div>
                  <p id = "loginQ" >Nu ai cont? <a style={{color: 'blue'}} href="/signup">Apasă aici!</a></p>
              </div>

        </div>
      </div>
    )
}