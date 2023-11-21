import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useAuth } from '../utils/AuthContext';


function GoogleAuth()
{

    const { login } = useAuth()



    return(
        <GoogleLogin
            onSuccess={credentialResponse => {
            var credentialResponse = jwtDecode(credentialResponse.credential)
            login(credentialResponse.name)
            }}
            onError={() => {
            console.log('Login Failed');
        }}
        />
    )
}

export default GoogleAuth;