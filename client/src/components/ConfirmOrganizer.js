import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ConfirmOrganizer = () => {
  let { email } = useParams();

  useEffect(() => {
    // Your logic to confirm the organizer status goes here
    // This might involve making a request to your server
    console.log(`Confirming organizer status for ${email}`);
  }, [email]);

  useEffect(() => {
    console.log(`Confirming organizer status for ${email}`);  
    axios.post(`${process.env.BACKEND_URL}/confirm-organizer/` + email)
  }, [email]);


  return (
    <div>
      <h1>Confirm Organizer</h1>
      <p>Organizer status confirmed for {email}</p>
    </div>
  );
};

export default ConfirmOrganizer;