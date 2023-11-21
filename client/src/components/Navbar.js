import { Link } from "react-router-dom"
import { useAuth } from "../utils/AuthContext"
import { useEffect } from "react"
import SearchEventsBar from "./SearchEventsBar"
import { useEvents } from "../utils/EventsProvider"
import { useState } from "react"
import AddEvent from "./addEvent"
import axios from "axios"



export default function Navbar()
{

    const {user, logout} = useAuth()
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        //Checking if user is an admin
        if (user.name) {
          axios.get(`/api/userRole/${user.name}`)
            .then((res) => {
              setIsAdmin(res.data.isAdmin);
            })
            .catch((error) => {
              console.error("Error fetching user role:", error);
            });
        }
        else
        {
          setIsAdmin(false)
        }
      }, [user]);

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
            <Link id = "logo" to="/">BVent</Link>
            <SearchEventsBar events={events} />
            {user.name ? (
                <>
                    <div id = "userName">
                        <p onClick={handleUserNameClick} id="userName">{user.name}</p>
                        
                            {showUserOptions && 
                            <div id="userOptions">
                                <AddEvent isAdmin = {isAdmin}/>
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