import React, { useState } from 'react';

function BecomeOrganizer() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Response not OK');
      }
  
      const data = await response.json();
      console.log('Email sent:', data);
      alert('Request sent!');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <>
    <div id="becomeOrganizer">
      <h1>Devino Organizator</h1>
      <p>Completează formularul</p>

      <div id = "organizerFormBackground">
        <form id = "organizerForm" onSubmit={handleSubmit}>
          <label>
            Prenume:
            <br></br>
            <input type="text" name="firstName" onChange={handleChange} />
          </label>
          <label>
            Nume:
            <br></br>
            <input type="text" name="lastName" onChange={handleChange} />
          </label>
          <label>
            Email:
            <br></br>
            <input type="email" name="email" onChange={handleChange} />
          </label>
          <label>
            Telefon:
            <br></br>
            <input type="tel" name="phone" onChange={handleChange} />
          </label>
          <input type="submit" value="Trimite" />
        </form>
        </div>
      </div>
    </>
  );
}

export default BecomeOrganizer;