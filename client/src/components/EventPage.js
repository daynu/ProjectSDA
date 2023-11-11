import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

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
        <Navbar />
        <h2>{eventData.title}</h2>
        <img id = "frontEventImage" src={eventData.picture} alt="eventPicture"/>
        <h2>{eventData.date}</h2>
        <button>Cumpără bilet</button>
        </>
    )

}


export default EventPage;