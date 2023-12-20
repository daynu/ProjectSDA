import React from "react";
import {useAuth} from "../utils/AuthContext";
import axios from "axios";
import {useEffect, useState} from "react";
import LoadingScreen from '../img/BrasovStema.png'
import Calendar from '../img/date.png'
import Location from '../img/pin.png'
import UserIcon from '../img/user.png'
import dateToString from "../utils/dateFormatter";


export default function UserPage() {

    const {user} = useAuth()

    const [interestedEventsIds, setInterestedEventsIds] = useState([])
    const [addedEventsIds, setAddedEventsIds] = useState([])
    const [interestedEvents, setInterestedEvents] = useState([])
    const [addedEvents, setAddedEvents] = useState([])
    const [displayedEvents, setDisplayedEvents] = useState([])
    const [activeOption, setActiveOption] = useState("")

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

    useEffect(() => {
        setDisplayedEvents(interestedEvents)
        setActiveOption("Evenimente interesate")
    }, [interestedEvents])

    return (
        <div>
            <div id="loadingOverlay" className={(interestedEvents.length === 0 || addedEvents.length === 0) ? 'show' : 'hide'}>
                <img id="loadingScreen" src={LoadingScreen} alt="LoadingScreen" />
            </div>
        {user.name && <h4>{user.name}</h4>}
        <div id="userPage">
            <div id = "userPageMenu">
                <div className="userPageMenuButton" onClick={() => {
                        setDisplayedEvents(interestedEvents)
                        setActiveOption("Evenimente interesate")
                }}>Evenimente interesate</div>
                <div className="userPageMenuButton" onClick={() => 
                    {
                        setDisplayedEvents(addedEvents)
                        setActiveOption("Evenimente adăugate")
                }}>Evenimente adăugate</div>
                <div className="userPageMenuButton">Setări</div>
            </div>
            <div id="userPageEventsContainer">
                <h3>{activeOption}</h3>
            {displayedEvents && displayedEvents.map(event => <a href={`/event/${event._id}`}>
                    <div className="eventCell">
                        <div className="eventCellImgContainer"><img className="eventCellImg" src={event.picture} alt={event.title}/></div>
                        <p className="eventCellTitle">{event.title}</p>
                        <div className="eventCellDate"><img className="eventIcon" alt="calendar" src={Calendar}/><p>{dateToString(event.date)}</p></div>
                        <div className="eventCellLocation"><img src={Location} className="eventIcon"/><p>{event.location}</p></div>
                        <div className="eventCellInterested"><img src={UserIcon} className="eventIcon"/><p>{event.interested_count} Interesați</p></div>
                        </div>
                    </a>)}
            </div>
        </div>
        

        </div>
    );

}


