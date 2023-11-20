import { Link } from "react-router-dom"
import { useAuth } from "../utils/AuthContext"
import { useEffect } from "react"
import SearchEventsBar from "./SearchEventsBar"
import { useEvents } from "../utils/EventsProvider"
import { useState } from "react"


export default function Navbar()
{

    const {user, logout} = useAuth()

    const [showUserOptions, setShowUserOptions] = useState(false)

    const events = useEvents()

   function LogOut()
   {
        logout()
        console.log("pressed")
   }

   function handleUserNameClick()
   {
    setShowUserOptions(!showUserOptions)
   }

    return(
        <div id="navbar">
            <Link id = "logo" to="/">EventBV</Link>
            <SearchEventsBar events={events} />
            {user.name ? (
                <>
                    <div id = "userName">
                        <p onClick={handleUserNameClick} id="userName">{user.name}</p>
                        
                            {showUserOptions && 
                            <div id="userOptions">
                                <button id = "logout" onClick = {LogOut}>Log out</button>
                            </div>}
                        
                    </div>
                    
                </>
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