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
                            <div class="userOptions">
                              <AddEvent isAdmin={isAdmin} />
                              {isAdmin &&
                              <div class="menu-item" onClick={() => window.location.pathname = "/manage-events"}>
                                Manage Events
                                </div>
                              }
                              <div class="menu-item" onClick={LogOut}>
                                <svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><path d="M938,500c0,16.7-7,31.7-18.1,42l0,0L737.4,711.6v0c-9.7,9-22.5,14.5-36.6,14.5c-30.2,0-54.8-25.3-54.8-56.5c0-16.7,7-31.7,18.1-42l0,0l76.5-71.1H408.7l0,0c-30.2,0-54.8-25.3-54.8-56.5s24.5-56.5,54.8-56.5l0,0h331.8l-76.5-71v0c-11.1-10.3-18.1-25.3-18.1-42c0-31.2,24.5-56.5,54.8-56.5c14.1,0,26.9,5.5,36.6,14.5l0,0L919.9,458l0,0C931,468.3,938,483.3,938,500z M390.5,123.1h-219v753.8h219c30.2,0,54.8,25.3,54.8,56.5c0,31.2-24.5,56.5-54.8,56.5H116.7C86.5,990,62,964.7,62,933.5V66.5C62,35.3,86.5,10,116.7,10h273.8c30.2,0,54.8,25.3,54.8,56.5C445.2,97.8,420.7,123.1,390.5,123.1z"></path>
                                </svg>
                                Log out
                              </div>
                            </div>
                            }
                            
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