import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import AddEvent from "./addEvent"

export default function Home()
{
    const [eventsData, setEventsData] = useState([{}])

    const [user, setUser] = useState()

    const [isAdmin, setIsAdmin] = useState(false)

    const [showForm, setShowForm] = useState(false)

    const location = useLocation()

    useEffect(() =>
    {
        axios.get('/api/events').then(res =>
            {
                setEventsData(res.data)
            })
    }, [])

    useEffect(() => {
        if (location.state && location.state.name) {
          setUser(location.state.name);
        }
      }, [location.state]);
      
      useEffect(() => {
        if (user) {
          axios.get(`/api/userRole/${user}`).then((res) => {
            setIsAdmin(res.data.isAdmin);
          });
        }
      }, [user]);
 
      function toggleAddForm()
      {
        setShowForm(true)
      }


    return (
        <>
        {(isAdmin && !showForm) && <button onClick={toggleAddForm}>Add Event</button>}
        {showForm && <AddEvent />}
        <div>
        {(typeof eventsData === 'undefined') ? (<p>Loading...</p>)
        : (eventsData.map((event, i)=>
        (
            <p key = {i}>{event.title}, {event.date}</p>
        )))}
        </div>
        </>
    )
}