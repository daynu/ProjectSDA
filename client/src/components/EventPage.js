import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import LoadingScreen from '../img/BrasovStema.png'
import dateToString from "../utils/dateFormatter";

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
        <div className="eventPage">
            <div className="eventView">
            <div className="titleAndDescription">
                <h2>{eventData.title}</h2>
                <p>{eventData.organizer}</p>
                <p>{eventData.description}</p>
                <a href={eventData.link ? eventData.link : "https://www.youtube.com/watch?v=NpkPy3y6ors"} target="_blank"><button>Cumpără bilet</button></a>
            </div>
            
            <div className="eventDetails">
                <img id = "frontEventImage" src={eventData.picture} alt="eventPicture"/>
                <p>{dateToString(eventData.date)}</p>
                <p>{eventData.hour}</p>
                <p>{eventData.location}</p> 
                
            </div>
        </div>
        
        
        
        
       
        </div>
       
        </>
    )

}


export default EventPage;