import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import LoadingScreen from '../img/BrasovStema.png'
import dateToString from "../utils/dateFormatter";
import Calendar from '../img/date.png'
import Location from '../img/pin.png'

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
            <div className="titleAndDescription">
                <h2>{eventData.title}</h2>
                <p>{eventData.organizer}</p>
                <p>{eventData.description}</p>
                <a href={eventData.link ? eventData.link : "https://www.youtube.com/watch?v=NpkPy3y6ors"} target="_blank"><button>Cumpără bilet</button></a>
            </div>
            
            <div className="eventPageContainer">
                <div className="eventDetails">
                    <h2>{eventData.title}</h2>
                    <div className="eventCellDate"><img className="eventIcon" alt="calendar" src={Calendar}/><p>{dateToString(eventData.date)}</p></div>
                    <div className="eventCellLocation"><img src={Location} className="eventIcon"/><p>{eventData.location}</p></div>
                </div>
                
                <div className="buyTicketContainer"><a href={eventData.link ? eventData.link : "https://www.youtube.com/watch?v=NpkPy3y6ors"} target="_blank"><button>Cumpără bilet</button></a></div>
                
            </div>
        </div>
        
        
        
        
       
        </div>
       
        </>
    )

}


export default EventPage;