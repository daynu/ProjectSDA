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
  const [todayEvents, setTodayEvents] = useState([])
  const [thisWeek, setThisWeek] = useState([])


  useEffect(() => {
    // Fetch data when the component mounts
    axios.get('/api/events').then(res =>
        {
            setEventsData(res.data)
        })
  }, []);

  useEffect(() =>
  {
    setTodayEvents(todaysEvents(eventsData))
    setThisWeek(thisWeekEvents(eventsData))
  }, [eventsData])

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
      <div id="evenimenteDisplay">
  <h2 id="evenimenteTitle">EVENIMENTE</h2>

  {todayEvents.length === 0 ? (
    <p></p>
  ) : (
    <>
      <h2>Astăzi</h2>
      <div id = "todayDisplay">
        {todayEvents.map((event, i) => (
        <div key={i}>
          <img alt="eventImage" src={event.picture} />
          <p>{event.title}, {event.date}</p>
        </div>
      ))
      }
      </div>
      
    </>
  )}

{thisWeek.length === 0 ? (
    <p></p>
  ) : (
    <>
      <h2>Această Săptămână</h2>
      <div id = "thisWeekDisplay">
        {thisWeek.map((event, i) => (
        <div key={i}>
          <img alt="eventImage" src={event.picture} />
          <p>{event.title}, {event.date}</p>
        </div>
      ))
      }
      </div>
      
    </>
  )}


  {eventsData.length === 0 ? (
    <p>Loading...</p>
  ) : (
    <div id = "Upcoming">
      {
    eventsData.map((event, i) => (
      <div key={i}>
        <img alt="eventImage" src={event.picture} />
        <p>{event.title}, {event.date}</p>
      </div>
    ))
   
} </div>
  )}
  
</div>
    </>
  );
}


function todaysEvents(events)
{
  let date = new Date()
  let todaysEvents = []
  console.log(date)

  for(let i = 0; i < events.length; i++)
  {

    let dateToCheck = new Date(events[i].date)
    if(date.getDate() === dateToCheck.getDate()
      && date.getMonth() === dateToCheck.getMonth()
    && date.getFullYear() === dateToCheck.getFullYear())
    {
      todaysEvents.push(events[i])
    }
  }

  return todaysEvents;
}


function thisWeekEvents(events)
{
  let date = new Date()
  let thisWeekEvents = []

  for(let i = 0; i < events.length; i++)
  {

    let dateToCheck = new Date(events[i].date)
    let timeDifference = dateToCheck - date
    let daysDifference = timeDifference/(1000 * 60 * 60 * 24)
    if(daysDifference < 7)
    {
      thisWeekEvents.push(events[i])
    }
  }

  thisWeekEvents.sort(compareDates)
  
  return thisWeekEvents;
}


function compareDates(date1, date2)
{
  const dateOne = new Date(date1)
  const dateTwo = new Date(date2)

  return dateOne - dateTwo;
}