import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

export default function Navbar()
{

    const [user, setUser] = useState([{}])


    return(
        <div id="navbar">
          <Link to='/'>Home</Link>
          <Link to='/contact'>Contact</Link>
          <div id = "loginSignup">
              <Link to='/login'>Login</Link>
              <Link to="/signup">Sign up</Link>
          </div>
         
        </div>
    )

}