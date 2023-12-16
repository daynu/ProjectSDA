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
            <ul>
                {eventsData.map(event => (
                    <li key={event._id}>
                        <h2>{event.name}</h2>
                        <p>{event.description}</p>
                        <p>{event.date}</p>
                        <p>{event.time}</p>
                        <p>{event.location}</p>
                        <p>{event.category}</p>
                        <button onClick={() => handleDeleteEvent(event._id)}>Delete</button>
                        <button onClick={() => window.location.pathname = `/edit-event/${event._id}`}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}