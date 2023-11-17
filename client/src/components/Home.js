import { useEffect, useState } from "react";
import axios from "axios";
import AddEvent from "./addEvent";
import EventCarousel from "./EventCarousel";
import { useAuth } from "../utils/AuthContext";
import LoadingScreen from '../img/BrasovStema.png'
import Filter from "./Filter";
import SearchEventsBar from "./SearchEventsBar";
import dateToString from "../utils/dateFormatter";


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
    console.log('Filter Preferences:', filterPreferences);
  
    let filtered = upcomingEvents(eventsData);
  
    if (Object.keys(filterPreferences).length > 0) {
      if (filterPreferences.date === 'today') {
          filtered = todaysEvents(filtered)
      }
      if (filterPreferences.date === 'thisWeek') {
        filtered = getThisWeekEvents(filtered)
      }
      if(filterPreferences.date === 'tomorrow')
      {
        filtered = getTomorrowEvents(filtered)
      }
      if (filterPreferences.category) {
        filtered = filterByCategory(filtered, filterPreferences.category)
      }
    }
  
    console.log('Applying filtering:', filtered);
    setFilteredEvents(filtered);
  }, [filterPreferences, eventsData]);


  useEffect(() =>
  {
    // Setting the events
    setUpcoming(upcomingEvents(eventsData))
    setFilteredEvents(upcomingEvents(eventsData))
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
    <SearchEventsBar events={eventsData} />
    <div id = "carouselContainer">
      <div id = "carousel">
        <EventCarousel events = {upcoming}/>
      </div>
      
    </div>
    <h2 id="evenimenteTitle">EVENIMENTE</h2>
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
                      <img className="eventCellImg" src={event.picture} alt={event.title}/>
                      <p className="eventCellTitle">{event.title}</p>
                      <p className="eventCellDate">{dateToString(event.date)}</p>
                    </div>
                  </a>
                ))
          ):
          (
            <p>Niciun eveniment găsit</p>
          )
          
        }
        </div>
  

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

function getTomorrowEvents(events)
{
  let date = new Date()
  let tomorrowEvents = []

  for(let i = 0; i < events.length; i++)
  {

    let dateToCheck = new Date(events[i].date)
    let timeDifference = dateToCheck - date
    let daysDifference = timeDifference/(1000 * 60 * 60 * 24)
    if(daysDifference < 1 && daysDifference > 0)
    {
      tomorrowEvents.push(events[i])
    }
  }

  return tomorrowEvents;
}


function getThisWeekEvents(events)
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





