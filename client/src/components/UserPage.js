import React from "react";
import {useAuth} from "../utils/AuthContext";
import axios from "axios";
import {useEffect, useState} from "react";
import LoadingScreen from '../img/BrasovStema.png'
import Calendar from '../img/date.png'
import Location from '../img/pin.png'
import UserIcon from '../img/user.png'
import dateToString from "../utils/dateFormatter";
import Navbar from "./Navbar";

export default function UserPage() {
  const { user, logout } = useAuth();

  const [interestedEventsIds, setInterestedEventsIds] = useState([]);
  const [addedEventsIds, setAddedEventsIds] = useState([]);
  const [interestedEvents, setInterestedEvents] = useState([]);
  const [addedEvents, setAddedEvents] = useState([]);
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [activeOption, setActiveOption] = useState('Evenimente interesate');
  const [eventsLoaded, setEventsLoaded] = useState(false);
  const [role, setRole] = useState('visitor');

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/user/${user.name}`).then(res => {
      setInterestedEventsIds(res.data.interested_events);
      setAddedEventsIds(res.data.added_events);
    });
  }, []);

  useEffect(() => {
    if (user.name) {
      axios.get(`${process.env.BACKEND_URL}/api/userRole/${user.name}`)
        .then((res) => {
          if(res.data.role) setRole(res.data.role);
        })
        .catch((error) => {
          console.error("Error fetching user role:", error);
        });
    }
    else
    {
      setRole('visitor')
    }
  }, [user]);

  useEffect(() => {
    const fetchEvents = async (eventIds, setEventsFunction) => {
      const events = await Promise.all(
        eventIds.map(eventId =>
          axios
            .get(`${process.env.BACKEND_URL}/api/event/${eventId}`)
            .then(res => res.data)
            .catch(error => {
              console.error(`Failed to fetch event with ID ${eventId}: ${error}`);
              return null;
            })
        )
      );
      setEventsFunction(events.filter(event => event !== null));
    };

    const fetchData = async () => {
      await fetchEvents(interestedEventsIds, setInterestedEvents);
      await fetchEvents(addedEventsIds, setAddedEvents);
      setEventsLoaded(true);
    };

    fetchData();
  }, [interestedEventsIds, addedEventsIds]);

  useEffect(() => {
    if (activeOption === 'Evenimente interesate') {
      setDisplayedEvents(interestedEvents);
    } else if (activeOption === 'Evenimente adăugate') {
      setDisplayedEvents(addedEvents);
    }
  }, [interestedEvents, addedEvents, activeOption]);

  const handleSettingsButton = () => {
    setActiveOption('Setări');
    setDisplayedEvents([]);
  };

  const handleDeleteButton = () => {
    const confirmed = window.confirm('Ești sigur că vrei să ștergi acest cont?');
  
    if (confirmed) {
      axios.delete(`${process.env.BACKEND_URL}/deleteUser/${user.name}`)
        .then(res => {
          console.log(res);
          logout();
          window.location.href = '/';
        })
        .catch(error => {
          console.error('Error deleting user:', error);
        });
    }
  };
  

  const handleDeleteEvent = async (eventId) => {

    const confirmed = window.confirm('Ești sigur că vrei să ștergi acest eveniment?');

    if (confirmed)
    {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete/${eventId}`);
      window.location.reload();
    
    };
  }

  return (
    <div>
      <div id="loadingOverlay" className={!eventsLoaded ? 'show' : 'hide'}>
        <img id="loadingScreen" src={LoadingScreen} alt="LoadingScreen" />
      </div>
      <Navbar />
      <div id="userPage">
        <div id="userPageMenu">
          <div
            className={`userPageMenuButton ${activeOption === 'Evenimente interesate' ? 'active' : ''}`}
            onClick={() => {
              setDisplayedEvents(interestedEvents);
              setActiveOption('Evenimente interesate');
            }}
          >
            Evenimente interesate
          </div>
          <div
            className={`userPageMenuButton ${activeOption === 'Evenimente adăugate' ? 'active' : ''}`}
            onClick={() => {
              setDisplayedEvents(addedEvents);
              setActiveOption('Evenimente adăugate');
            }}
          >
            Evenimente adăugate
          </div>
          <div className={`userPageMenuButton ${activeOption === 'Setări' ? 'active' : ''}`} onClick={handleSettingsButton}>
            Setări
          </div>
        </div>
        <div id="userActiveOption">
          <h3>{activeOption}</h3>
          <div id="userPageEventsContainer">
            {displayedEvents &&
              displayedEvents.map(event => (
                <div className="eventCell">
                <div className="eventCellImgContainer"><img className="eventCellImg" src={event.picture} alt={event.title}/></div>
                <p className="eventCellTitle">{event.title}</p>
                <div className="eventCellDate"><img className="eventIcon" alt="calendar" src={Calendar}/><p>{dateToString(event.date)}</p></div>
                <div className="eventCellLocation"><img src={Location} className="eventIcon"/><p>{event.location}</p></div>
                <div className="eventCellInterested"><img src={UserIcon} className="eventIcon"/><p>{event.interested_count} Interesați</p></div>
                <div className="eventCellButtons">
                    <button className="eventCellButton" onClick={() => window.location.href = `/event/${event._id}`}>Detalii</button>
                    {activeOption === 'Evenimente adăugate' && <> <button className="eventCellButton" onClick={() => handleDeleteEvent(event._id)}>Șterge</button>
                                    <button onClick={() => window.location.href = `/edit-event/${event._id}`} className="eventCellButton">Editează</button></>}
                </div>    
              </div>
              ))}
          </div>
          <div id="userPageSettingsContainer">
            {displayedEvents.length === 0 && activeOption === 'Setări' && (
              <div>
                <p>Rol: {role}</p>
                <button onClick={handleDeleteButton}>Ștergere Cont</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}