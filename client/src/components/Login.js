import React, { useState } from 'react';
import axios from 'axios';

export default function Login()
{

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
              console.log(response)
          });
  
          
        } catch (error) {
          // Handle errors, e.g., show an error message to the user
          console.error(error);
        }
      };
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
          ...loginData,
          [name]: value,
        });
      };

    return(
        <>
            <h2>Log into your account</h2>
            <p>{response && response}</p>
            <form onSubmit={handleFormSubmit} id = 'loginForm'>
                <input onChange={handleInputChange} name="name" type="text" placeholder="Username" />
                <input onChange={handleInputChange} name="password" type="password" placeholder="Password" />
                <input type="submit" value="Log in"/>
            </form>
            <div>
                <p>Don't have an account? <a style={{color: 'blue'}} href="/signup">Click here to sign up</a></p>
            </div>
        </>
    )
}