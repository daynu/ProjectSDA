import { useEffect, useState } from "react";
import axios from "axios";
import AddEvent from "./addEvent";
import EventCarousel from "./EventCarousel";
import { useAuth } from "../utils/AuthContext";
import LoadingScreen from '../img/BrasovStema.png'
import Filter from "./Filter";


export default function Home() {
  const [eventsData, setEventsData] = useState([]);
  const { user } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [upcoming, setUpcoming] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const [filterPreferences, setFilterPreferences] = useState({
    category: '',
    date: ''
  })


  useEffect(() => {
    // Fetch data when the component mounts
    axios.get('/api/events').then(res =>
        {
            setEventsData(res.data)
        })
  }, []);

  useEffect(() => {

    console.log(filterPreferences)
    let filteredEvents = eventsData;
  
    if (filterPreferences.date === 'today') {
      filteredEvents = todaysEvents(filteredEvents);
    } else if (filterPreferences.date === 'thisWeek') {
      filteredEvents = thisWeekEvents(filteredEvents);
    }
  
    filteredEvents = filterByCategory(filteredEvents, filterPreferences.category);
  
    setFilteredEvents([...filteredEvents]);
  }, [filterPreferences]);

  useEffect(() =>
  {
    // Setting the events

    setUpcoming(upcomingEvents(eventsData))
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

  useEffect(() =>
  {
    fetchEvents()
  }, [showForm])

  function toggleAddForm() {
    setShowForm(!showForm);
  }

  function fetchEvents() {
    axios.get('/api/events')
      .then((res) => {
        setEventsData(res.data);
        setRefresh(!refresh); 
        console.log("FETCHCHHCHCHCCHHC")
      })
      .catch((error) => {
        console.error(error);
      });
  }


  function toggleFilter()
  {
    setShowFilter(!showFilter)
  }


  return (
    <>

      <div id="loadingOverlay" className={eventsData.length === 0 ? 'show' : 'hide'}>
        <img id="loadingScreen" src={LoadingScreen} alt="LoadingScreen" />
      </div>

    <div id = "carouselContainer">
      <div id = "carousel">
        <EventCarousel events = {upcoming}/>
      </div>
      
    </div>
    
      {isAdmin && !showForm && (
        <button onClick={toggleAddForm}>Add Event</button>
      )}
      {showForm && <AddEvent toggleAddForm = {toggleAddForm}/>}  
      <button onClick={toggleFilter}>Filtru</button>
      {showFilter && <Filter toggleFilter={toggleFilter}  setFilterPreferences={setFilterPreferences}/>}
      <div id="evenimenteDisplay">
        {
          filteredEvents.length > 0 ? 
          (
                filteredEvents.map((event) =>
                (
                  <a href={`/event/${event._id}`}>
                  <div className="eventCell">
                      <img src={event.picture} alt={event.title}/>
                      <p>{event.title}</p>
                    </div>
                  </a>
                ))
          ):
          (
            <p>Niciun eveniment găsit</p>
          )
          
        }
        </div>
  <h2 id="evenimenteTitle">EVENIMENTE</h2>

  </>
)

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

function upcomingEvents(events)
{
  let date = new Date()
  let upcomingEvents = []

  for(let i = 0; i < events.length; i++)
  {

    let dateToCheck = new Date(events[i].date)
    let timeDifference = dateToCheck - date
    let daysDifference = timeDifference/(1000 * 60 * 60 * 24)
    if(daysDifference > -1)
    {
      upcomingEvents.push(events[i])
    }
  }
  
  return upcomingEvents;


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
    if(daysDifference < 7 && daysDifference > 0)
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


function filterByCategory(events, category)
{
  let newEvents = []

  for(let i = 0; i < events.length; i++)
  {
    if(events[i].category === category)
    {
      newEvents.push(events[i])
    }
  }

  return newEvents
}