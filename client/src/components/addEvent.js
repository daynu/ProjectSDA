import axios from "axios";
import { useState, useEffect } from "react";
import convertTo64 from "../utils/convertTo64";
import { useAuth } from "../utils/AuthContext";


export default function AddEvent({isAdmin})
{

  const [showForm, setShowForm] = useState(false);

  const {user} = useAuth()

  function toggleAddForm() {
    setShowForm(!showForm);
  }

    const [formData, setFormData] = useState({
        title: '',
        date: '',
        picture: '',
        hour: '',
        location: '',
        description: '',
        organizer: '',
        link: '',
        category: 'Muzica',
        user: user.name   
      });

    const [photo, setPhoto] = useState()


    const handleFormSubmit = (e) =>
      {
        e.preventDefault()
        toggleAddForm()

        try
        {
            axios.post('/addevent', formData).then(res =>
              {
                 console.log("Event Added")
              })
           
        }
        catch(e)
        {
            console.error(e)
        }
      }


      const handleChange = (e) =>
      {
        const {name, value} = e.target;
        setFormData({
            ...formData, 
            [name]: value
        })
      }

      const handleFileChange = async (e) =>
      {
        const file = e.target.files[0]
        const base64 = await convertTo64(file)

        setPhoto(base64)

        setFormData({
          ...formData,
          picture: base64
        })

      }

      function cancelAdd()
      {
        toggleAddForm()
      }


    return(
      <>
      {isAdmin && <div class="menu-item" onClick={toggleAddForm}>
        <svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><g><path d="M931.5,441.5h-373v-373c0-32.3-26.1-58.5-58.5-58.5c-32.4,0-58.5,26.2-58.5,58.5v373h-373C36.1,441.5,10,467.7,10,500c0,32.3,26.1,58.5,58.5,58.5h372.9v373c0,32.3,26.2,58.5,58.5,58.5c32.4,0,58.5-26.2,58.5-58.5v-373h373c32.4,0,58.5-26.2,58.5-58.5C990,467.7,963.9,441.5,931.5,441.5z"></path></g>
                                </svg>
                                Add event
                              </div>
        }
        
      {showForm &&
      
      <div id = "addEventBox">
        <form onSubmit={handleFormSubmit} id = "eventForm">
          <label id = "headerAE">Adaugă un eveniment</label>
            <label id = "butonPozaAE" htmlFor="pictureInput" className="btn">
              {photo && <img id = "pozaAE" src={photo} alt="EventPhoto"/>}
            </label>
           
            <input onChange={handleFileChange} id="pictureInput" type="file" accept=".jpeg, .jpg, .png" required/>
            <input id = "titluAE" onChange={handleChange} name = "title" placeholder="Nume eveniment" type="text" required/>
  
            <div id = "dataOraLoc">

              <div id = "dataAE">
                <label>Data</label>
                <input onChange={handleChange} name = "date" type="date" required/>
              </div> 

              <div id = "oraAE">
                <label>Ora</label>
                <input onChange={handleChange} name="hour" type="time" required/>
              </div>

              <div id = "loculAE">
                <label>Locul</label>
              <input onChange={handleChange} name="location" placeholder="Locul" type="text" required/>
              </div>
            </div> 

            <textarea id = "descriereAE" onChange={handleChange} name="description" placeholder="Descriere" type="text" required />
            <input id = "organizatorAE" onChange={handleChange} name="organizer" placeholder="Organizatorul" type="text" required/>
            <label id = "categorieTxtAE">Categorie</label>
            <select id="selectAE" onChange={handleChange} name="category">
              <option value="Muzica">Muzică</option>
              <option value="Teatru">Teatru</option>
              <option value="Sport">Sport</option>
              <option value="Altele">Altele</option>
            </select>
            <input id = "linkAE" onChange={handleChange} name="link" placeholder="Link bilet" type="text" required/>
            
            <input id = "submitAE" type="submit" value="Adăugare"/>
            <button id = "cancelAE" onClick={cancelAdd}>Cancel</button>           
        </form>
        </div> 
      }
      
        </>
    )
}


