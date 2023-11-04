import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Navbar()
{

    const [user, setUser] = useState()

    const location = useLocation()
    try
    {
        useEffect(() => {
            if (location.state && location.state.name) {
              setUser(location.state.name);
            }
          }, [location.state]);
    }
    catch(e)
    {
        console.error(e)
    }

   function LogOut()
   {
        setUser('')
        console.log("pressed")
   }



    return(
        <div id="navbar">
          <Link to='/'>Home</Link>
          <Link to='/contact'>Contact</Link>
          
            {user ? (
                <div id = "loginSignup">
                <p>{user}</p>
                <button id = "logout" onClick = {LogOut}>Log out</button>
                </div>
                )
            :
            (   <div id = "loginSignup">
                <Link to='/login'>Login</Link>
                <Link to="/signup">Sign up</Link>
                </div>
            )}

         
        </div>
    )

}