import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingScreen from '../img/BrasovStema.png'

export default function ManageEvents() {

    const [eventsData, setEventsData] = useState([]);

    useEffect(() => {
        axios.get('/api/events').then(res =>
            {
                setEventsData(res.data)
            })
    }, []);


    const handleDeleteEvent = (eventId) => {
        axios.delete('/delete/' + eventId)
        window.location.reload();
    }


    return(
        <div>
            <div id="loadingOverlay" className={eventsData.length === 0 ? 'show' : 'hide'}>
                <img id="loadingScreen" src={LoadingScreen} alt="LoadingScreen" />
            </div>
            <h1>Events</h1>
            <div id="eventsManageContainer">
                {eventsData.map(event => (
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
    )
}