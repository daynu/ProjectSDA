import React from "react";
import {useAuth} from "../utils/AuthContext";
import axios from "axios";
import {useEffect, useState} from "react";
import LoadingScreen from '../img/BrasovStema.png'

export default function UserPage() {

    const {user} = useAuth()

    const [interestedEventsIds, setInterestedEventsIds] = useState([])
    const [addedEventsIds, setAddedEventsIds] = useState([])
    const [interestedEvents, setInterestedEvents] = useState([])
    const [addedEvents, setAddedEvents] = useState([])

    useEffect(() => {
        axios.get(`/api/user/${user.name}`).then(res => {
            setInterestedEventsIds(res.data.interested_events)
            setAddedEventsIds(res.data.added_events)
        })
    }, [])

    useEffect(() => {
        const fetchInterestedEvents = async () => {
            const events = await Promise.all(
                interestedEventsIds.map(eventId =>
                    axios.get(`/api/event/${eventId}`)
                        .then(res => res.data)
                        .catch(error => {
                            console.error(`Failed to fetch event with ID ${eventId}: ${error}`);
                            return null;
                        })
                )
            );
            setInterestedEvents(events.filter(event => event !== null));
        };
        fetchInterestedEvents();
    }, [interestedEventsIds]);
    
    useEffect(() => {
        const fetchAddedEvents = async () => {
            const events = await Promise.all(
                addedEventsIds.map(eventId =>
                    axios.get(`/api/event/${eventId}`)
                        .then(res => res.data)
                        .catch(error => {
                            console.error(`Failed to fetch event with ID ${eventId}: ${error}`);
                            return null;
                        })
                )
            );
            setAddedEvents(events.filter(event => event !== null));
        };
        fetchAddedEvents();
    }, [addedEventsIds]);



    return (
        <div>
            <div id="loadingOverlay" className={(interestedEvents.length === 0 || addedEvents.length === 0) ? 'show' : 'hide'}>
                <img id="loadingScreen" src={LoadingScreen} alt="LoadingScreen" />
            </div>
        <h1>User Page</h1>
        {user.name && <p>Logged in as {user.name}</p>}
        <h2>Interested Events</h2>
        {interestedEvents && interestedEvents.map(event => <p>{event.title}</p>)}
        <h2>Created Events</h2>
        {addedEvents && addedEvents.map(event => <p>{event.title}</p>)}
        </div>
    );

}


