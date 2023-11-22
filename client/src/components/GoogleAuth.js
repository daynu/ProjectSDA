import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useAuth } from '../utils/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';


function GoogleAuth()
{

    const { login } = useAuth()

    const [credentials, setCredentials] = useState([])

    function addUser()
    {
        axios.post('/google-user-add', credentials)
    }

    return(
        <GoogleLogin
            onSuccess={credentialResponse => {
            var credentialResponse = jwtDecode(credentialResponse.credential)
            setCredentials(credentialResponse)
            addUser()
            login(credentialResponse.name)
            }}
            onError={() => {
            console.log('Login Failed');
        }}
        />
    )
}

export default GoogleAuth;