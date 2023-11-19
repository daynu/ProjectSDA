import { Link } from "react-router-dom"
import { useAuth } from "../utils/AuthContext"
import { useEffect } from "react"
import SearchEventsBar from "./SearchEventsBar"


export default function Navbar({events})
{

    const {user, logout} = useAuth()

   function LogOut()
   {
        logout()
        console.log("pressed")
   }


    return(
        <div id="navbar">
            <Link id = "logo" to="/">EventBV</Link>
            <SearchEventsBar events={events} />
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