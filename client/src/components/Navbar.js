import { Link } from "react-router-dom"
import { useAuth } from "../utils/AuthContext"
import { useEffect } from "react"
import SearchEventsBar from "./SearchEventsBar"
import { useEvents } from "../utils/EventsProvider"
import { useState } from "react"
import AddEvent from "./addEvent"





export default function Navbar()
{

    const {user, logout, role} = useAuth()


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
                        <p onClick={handleUserNameClick} id="usersName">{user.name}</p>
                        
                            {showUserOptions && 
                            <div class="userOptions">
                              <div class="menu-item" onClick={() => window.location.pathname = `/user/${user.name}`}>
                              <svg className="menu-icon" xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg>
                                My Profile
                              </div>
                              <AddEvent role={role} />
                              {role === "admin" &&
                              <div class="menu-item" onClick={() => window.location.pathname = "/manage-events"}>
                                <svg className="menu-icon" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M448 160H320V128H448v32zM48 64C21.5 64 0 85.5 0 112v64c0 26.5 21.5 48 48 48H464c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zM448 352v32H192V352H448zM48 288c-26.5 0-48 21.5-48 48v64c0 26.5 21.5 48 48 48H464c26.5 0 48-21.5 48-48V336c0-26.5-21.5-48-48-48H48z"/></svg>
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