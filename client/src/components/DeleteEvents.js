import React, { useState, useEffect } from "react";
import axios from "axios";

export default function DeleteEvents() {

    const [eventsData, setEventsData] = useState([]);

    useEffect(() => {
        axios.get('/api/events').then(res =>
            {
                setEventsData(res.data)
            })
    }, []);


    const handleDeleteEvent = (eventId) => {
        axios.delete('/delete/' + eventId)
    }

    return(
        <div>
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
                    </li>
                ))}
            </ul>
        </div>
    )
}