import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingScreen from '../img/BrasovStema.png'
import Magnifying from '../img/Magnifying.svg.png';
import { useAuth } from "../utils/AuthContext";
import { getSearchEvents } from "../utils/SearchBarUtils";
import { Link } from "react-router-dom";

export default function ManageEvents() {

    const [eventsData, setEventsData] = useState([]);
    const [searchedEvents, setSearchedEvents] = useState([eventsData]);
    const { user } = useAuth()
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
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
    }
    , [user])

    useEffect(() => {
        axios.get('/api/events').then(res =>
            {
                setEventsData(res.data)
            })
    }, []);

    useEffect(() => {
        setSearchedEvents(eventsData);
    }, [eventsData])


    const handleDeleteEvent = (eventId) => {
        axios.delete('/delete/' + eventId)
        window.location.reload();
    }

    const handleSearch = (e) => {
        const updatedSearch = e.target.value;
        if(updatedSearch === '')
        {
            setSearchedEvents(eventsData);
            return;
        }
        const results = getSearchEvents(updatedSearch, eventsData);
        setSearchedEvents(results);
    }


    return(
        isAdmin ? (
        <div>
            <div id="navbarManage">
                <Link id = "logo" to="/">BVent</Link>
                <div id="searchBar">
                <div id="searchMain">
                <img src={Magnifying} alt="magnifying" />
                <input
                id="searchArea"
                onChange={handleSearch}
                type="text"
                placeholder="Caută evenimente"
                />
        </div>
            </div>
                
      </div>
            <div id="loadingOverlay" className={eventsData.length === 0 ? 'show' : 'hide'}>
                <img id="loadingScreen" src={LoadingScreen} alt="LoadingScreen" />
            </div>
            {searchedEvents.length === 0 ? <div id="NoEventManage">Niciun eveniment găsit
            </div> : <></>}
            <div id="eventsManageContainer">
                
                {searchedEvents.map(event => (
                        <div className="eventManageCell" key={event._id}>
                            <div className="eventManageCellImage">
                                <img src={event.picture} alt={event.name} />
                            </div>
                            <div className="eventManageCellInfo">
                                 <h4>{event.title}</h4>
                                <p>{event.date}</p>
                                <p>{event.time}</p>
                                <p>{event.location}</p>
                                <p>{event.category}</p>
                            </div>
                            <div className="eventManageCellButtons">
                                <button className="manageButton" onClick={() => handleDeleteEvent(event._id)}>Delete</button>
                                <button className="manageButton" onClick={() => window.location.pathname = `/edit-event/${event._id}`}>Edit</button>
                            </div>
                            
                        </div>
                ))}
                </div>
        </div>
        ) : (
        <>
            <div id="loadingOverlay" className={eventsData.length === 0 ? 'show' : 'hide'}>
                <img id="loadingScreen" src={LoadingScreen} alt="LoadingScreen" />
            </div>
            <div>Unauthorized Access</div>
            <button onClick={() => window.location.pathname = '/'}>Înapoi la pagina principală</button>
        </>
    
    )
    )
}