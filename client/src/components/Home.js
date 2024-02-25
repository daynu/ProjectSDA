import { useEffect, useState } from "react";
import axios from "axios";
import { CSSTransition } from "react-transition-group";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from "../utils/AuthContext";
import LoadingScreen from '../img/BrasovStema.png'
import Filter from "./Filter";
import dateToString from "../utils/dateFormatter";
import Navbar from "./Navbar";
import Brasov from '../img/brasov.jpg'
import Calendar from '../img/date.png'
import Location from '../img/pin.png'
import Footer from "./Footer";
import UserIcon from '../img/user.png'
import Left from '../img/left.png'
import Right from '../img/right.png'
import * as dotenv from 'dotenv'

dotenv.config({ path: '../../.env'})


export default function Home() {
  const [eventsData, setEventsData] = useState([]);
  const { user } = useAuth()
  const [refresh, setRefresh] = useState(false);
  const [upcoming, setUpcoming] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const [filterPreferences, setFilterPreferences] = useState({
    category: '',
    date: ''
  })

  const [displayedEvents, setDisplayedEvents] = useState([])

  useEffect(() => {
    setDisplayedEvents(filteredEvents.slice(0, 3))
  }, [filteredEvents])


  useEffect(() => {
    
    axios.get(`https://bvent-backend.onrender.com/api/events`).then(res =>
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
        console.log(filtered)
        filtered = filterByCategory(filtered, filterPreferences.category)
        console.log(filtered)
      }
    }
  
    console.log('Applying filtering:', filtered);
    setFilteredEvents(filtered);
  }, [filterPreferences, eventsData]);


  useEffect(() =>
  {
    
    setUpcoming(upcomingEvents(eventsData))
    setFilteredEvents(upcomingEvents(eventsData))
  }, [eventsData])



  function handlePrevious() {
    let currentEvents = displayedEvents;
    let index = filteredEvents.indexOf(currentEvents[0]);
    if (index - 1 >= 0) {
      setDisplayedEvents(filteredEvents.slice(index - 1, index + 2));
    }
  }
  
  function handleNext() {
    let currentEvents = displayedEvents;
    let index = filteredEvents.indexOf(currentEvents[0]);
    if (index + 3 < filteredEvents.length) {
      setDisplayedEvents(filteredEvents.slice(index + 1, index + 4));
    }
  }
  
  
  
  


  function toggleFilter()
  {
    setShowFilter(!showFilter)
  }


  return (
    <div id="mainPage">
      <Navbar  events={eventsData}/>

      <div id="loadingOverlay" className={eventsData.length === 0 ? 'show' : 'hide'}>
        <img id="loadingScreen" src={LoadingScreen} alt="LoadingScreen" />
      </div>
    <div id = "mainPhotoContainer">
      <img className="vignette" id="mainPhoto" src={Brasov} alt="Brasov" />
      <p id="mainTitle">Evenimente în Brașov</p>
      
    </div>
    <div id="filterContainer">
          <Filter toggleFilter={toggleFilter}  setFilterPreferences={setFilterPreferences}/>
    </div>  
    
    
    <CSSTransition
      in={displayedEvents}
      transitionLeaveTimeout={1000}>
      <div id="evenimenteDisplay">
        {
          displayedEvents.length > 0 ? 
          (
                displayedEvents.map((event) =>
                (
                  <a href={`/event/${event._id}`}>
                  <div className="eventCell">
                      <div className="eventCellImgContainer"><img className="eventCellImg" src={event.picture} alt={event.title}/></div>
                      <p className="eventCellTitle">{event.title}</p>
                      <div className="eventCellDate"><img className="eventIcon" alt="calendar" src={Calendar}/><p>{dateToString(event.date)}</p></div>
                      <div className="eventCellLocation"><img src={Location} className="eventIcon"/><p>{event.location}</p></div>
                      <div className="eventCellInterested"><img src={UserIcon} className="eventIcon"/><p>{event.interested_count} Interesați</p></div>
                    </div>
                  </a>
                ))
          ):
          (
            <p>Niciun eveniment găsit</p>
          )
          
        }
        {filteredEvents.length > 3 && (<div id="navigationButtons">
          <button id="previousButton" onClick={() => handlePrevious()}><img className="arrow" src={Left} /></button>
          <button id="nextButton" onClick={() => handleNext()}><img className="arrow" src={Right} /></button>
        </div>)}
        
      </div>
  </CSSTransition>
        <Footer />
  </div>
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
  
  const sortedUpcoming = upcomingEvents.sort((a, b) => compareDates(a.date, b.date))

  return sortedUpcoming;


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

  const sortedNewEvents = newEvents.sort((a, b) => compareDates(a.date, b.date))

  return sortedNewEvents;
}





