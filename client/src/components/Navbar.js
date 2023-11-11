import { Link } from "react-router-dom"
import { useAuth } from "../utils/AuthContext"
import { useEffect } from "react"


export default function Navbar()
{

    const {user, logout} = useAuth()

   function LogOut()
   {
        logout()
        console.log("pressed")
   }


    return(
        <div id="navbar">
            <button id = "homeButton">
                <Link to='/'/>
            </button>
          
            {user.name ? (
                <div id = "loginSignup">
                <p id="userName">{user.name}</p>
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