import axios from 'axios';
import React, { useState, useEffect } from 'react';
import convertTo64 from '../utils/convertTo64';
import LoadingScreen from '../img/BrasovStema.png'

const EditEvent = () => {
    const [event, setEvent] = useState([]);
    const [eventId, setEventId] = useState('');

    useEffect(() => {
        const eventId = window.location.pathname.split('/').pop();
        setEventId(eventId);
    }, []);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                axios.get(`/api/event/${eventId}`).then(res => {
                    setEvent(res.data);
                });
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEvent({ ...event, [name]: value });
    };
    


    useEffect(() => {
        console.log('Event details:', event);
    }, [event]);

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/edit/${eventId}`, event);
            window.history.back();
        } catch (error) {
            console.error('API call failed:', error);
        }
    }


    const handlePictureChange = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertTo64(file);
        setEvent({ ...event, picture: base64 });
    };

    return (
        
        <div>
           <div id="loadingOverlay" className={event.length === 0 ? 'show' : 'hide'}>
            <img id="loadingScreen" src={LoadingScreen} alt="LoadingScreen" />
        </div>
            <div id = "addEventBox">
        <form onSubmit={handleSubmitEdit} id = "eventForm">
          <label id = "headerAE">Edit Event</label>
            <label id = "butonPozaAE" htmlFor="pictureInput" className="btn">
              <img id = "pozaAE" src={event.picture} alt="EventPhoto"/>
            </label>
           
            <input onChange={handlePictureChange} id="pictureInput" type="file" accept=".jpeg, .jpg, .png"/>
            <input id = "titluAE" onChange={handleInputChange} value={event.title} name = "title" placeholder="Nume eveniment" type="text" required/>
  
            <div id = "dataOraLoc">

              <div id = "dataAE">
                <label>Data</label>
                <input onChange={handleInputChange} value={event.date} name = "date" type="date" required/>
              </div> 

              <div id = "oraAE">
                <label>Ora</label>
                <input onChange={handleInputChange} value={event.hour} name="hour" type="time" required/>
              </div>

              <div id = "loculAE">
                <label>Locul</label>
              <input onChange={handleInputChange} value={event.location} name="location" placeholder="Locul" type="text" required/>
              </div>
            </div> 

            <textarea id = "descriereAE" onChange={handleInputChange} value={event.description} name="description" placeholder="Descriere" type="text" required />
            <input id = "organizatorAE" onChange={handleInputChange} value={event.organizer} name="organizer" placeholder="Organizatorul" type="text" required/>
            <label id = "categorieTxtAE">Categorie</label>
            <select id="selectAE" onChange={handleInputChange} value={event.category} name="category">
              <option value="Muzica">Muzică</option>
              <option value="Teatru">Teatru</option>
              <option value="Sport">Sport</option>
              <option value="Altele">Altele</option>
            </select>
            <input id = "linkAE" onChange={handleInputChange} value={event.link} name="link" placeholder="Link bilet" type="text" required/>
            
            <input id = "submitAE" type="submit" value="Save"/>
            <button onClick={() => window.location.pathname = "/manage-events"} id = "cancelAE" >Cancel</button>           
        </form>
        </div> 
      
        </div>
    );
};



export default EditEvent;

