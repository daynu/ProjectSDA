import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Navbar()
{

    const [user, setUser] = useState([{}])

    const location = useLocation()

    useEffect(() =>
    {
        if(location.state.name)
        {
            setUser(location.state.name)
            console.log(user)
        }
    }, [])
   

    return(
        <div id="navbar">
          <Link to='/'>Home</Link>
          <Link to='/contact'>Contact</Link>
          <div id = "loginSignup">
            {user && <p>{user.name}</p>}
              <Link to='/login'>Login</Link>
              <Link to="/signup">Sign up</Link>
          </div>
         
        </div>
    )

}