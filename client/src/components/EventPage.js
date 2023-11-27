import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import LoadingScreen from '../img/BrasovStema.png'
import dateToString from "../utils/dateFormatter";
import Calendar from '../img/date.png'
import Location from '../img/pin.png'
import Clock from '../img/clock.png'

function EventPage()
{
    const { id } = useParams()
    const [eventData, setEventData] = useState([])

    useEffect(() =>
    {
        axios.get(`/api/event/${id}`).then(res =>
            {
                setEventData(res.data)
            }
        )
    }, [id])

    return(
        <>
        <div id="loadingOverlay" className={eventData.length === 0 ? 'show' : 'hide'}>
            <img id="loadingScreen" src={LoadingScreen} alt="LoadingScreen" />
        </div>
        <Navbar />
        <div id = "mainEventPhotoContainer">
            <img className="vignette" id="mainPhoto" src={eventData.picture} alt="eventPicture" />
        </div>
        <div className="eventPage">
            <div className="eventView">
            <div className="eventDescription">
                <h2>Despre</h2>
                <p>Organizator: {eventData.organizer}</p>
                <p>{eventData.description}</p>
            </div>
            
            <div className="ticket">
                <div className="eventDetails">
                    <h2 className="eventCellTitle">{eventData.title}</h2>
                    <div className="eventCellDate"><img className="eventIcon" alt="calendar" src={Calendar}/><p>{dateToString(eventData.date)}</p></div>
                    <div className="eventCellLocation"><img src={Location} className="eventIcon" alt="pin"/><p>{eventData.location}</p></div>
                    <div className="eventCellHour"><img src={Clock} className="eventIcon" alt="clock"/><p>{eventData.hour}</p></div>
                </div>
                
            <div className="buyTicketContainer">
                <a id="buyTicketLink" href={eventData.link ? eventData.link : "https://www.youtube.com/watch?v=NpkPy3y6ors"} target="_blank"><button id="buyTicket">Cumpără bilet</button></a>
                <button id="interestedButton">Interesat</button>
                </div>
            </div>
        </div>
        
        
        
        
       
        </div>
       
        </>
    )

}


export default EventPage;