import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import LoadingScreen from '../img/BrasovStema.png'

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
        <h2>{eventData.title}</h2>
        <img id = "frontEventImage" src={eventData.picture} alt="eventPicture"/>
        <h2>{eventData.date}</h2>
        <h2>{eventData.hour}</h2>
        <h2>{eventData.location}</h2>
        
        <button>Cumpără bilet</button>
        </>
    )

}


export default EventPage;