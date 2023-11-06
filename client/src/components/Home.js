import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AddEvent from "./AddEvent";

export default function Home() {
  const [eventsData, setEventsData] = useState([]);
  const [user, setUser] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const location = useLocation();


  useEffect(() => {
    // Fetch data when the component mounts
    axios.get('/api/events').then(res =>
        {
            setEventsData(res.data)
        })
  }, []);

  useEffect(() => {
    if (location.state && location.state.name) {
      setUser(location.state.name);
    }
  }, [location.state]);

  useEffect(() => {
    if (user) {
      axios.get(`/api/userRole/${user}`)
        .then((res) => {
          setIsAdmin(res.data.isAdmin);
        })
        .catch((error) => {
          console.error("Error fetching user role:", error);
        });
    }
  }, [user]);

  function toggleAddForm() {
    setShowForm(true);
  }

  function fetchEvents() {
    axios.get('/api/events')
      .then((res) => {
        setEventsData(res.data);
        setRefresh(!refresh); // Toggle the value to trigger a re-render
        console.log("FETCHCHHCHCHCCHHC")
      })
      .catch((error) => {
        console.error(error);
      });
  }



  return (
    <>
      {isAdmin && !showForm && (
        <button onClick={toggleAddForm}>Add Event</button>
      )}
      {showForm && <AddEvent fetchEvents = {fetchEvents}/>}
      <div>
        {eventsData.length === 0 ? (
          <p>Loading...</p>
        ) : (
          eventsData.map((event, i) => (
            <p key={i}>
              <img alt="eventImage" src={event.picture}></img>{event.title}, {event.date}
            </p>
          ))
        )}
      </div>
    </>
  );
}
