import { useEffect, useState } from "react";
import axios from "axios";
import AddEvent from "./AddEvent";
import EventCarousel from "./EventCarousel";
import { useAuth } from "../utils/AuthContext";
import LoadingScreen from '../img/BrasovStema.png'


export default function Home() {
  const [eventsData, setEventsData] = useState([]);
  const { user } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);
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
    // Setting the events
    setTodayEvents(todaysEvents(eventsData))
    setThisWeek(thisWeekEvents(eventsData))
  }, [eventsData])

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
    
      <div id="loadingOverlay" className={eventsData.length === 0 ? 'show' : 'hide'}>
        <img id="loadingScreen" src={LoadingScreen} alt="LoadingScreen" />
      </div>

    <div id = "carouselContainer">
      <div id = "carousel">
        <EventCarousel events = {eventsData}/>
      </div>
      
    </div>
    
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

  const sortedWeek = thisWeekEvents.sort((a, b) => compareDates(a.date, b.date))
  
  return sortedWeek;
}


function compareDates(date1, date2)
{
  const dateOne = new Date(date1)
  const dateTwo = new Date(date2)

  return dateOne - dateTwo;
}