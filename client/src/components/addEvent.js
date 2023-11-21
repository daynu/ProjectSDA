import axios from "axios";
import { useState } from "react";

export default function AddEvent({isAdmin})
{

  const [showForm, setShowForm] = useState(false);
  

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
        category: ''
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
      {isAdmin && <button onClick={toggleAddForm}>Add event</button>}
      {showForm &&
      <div id = "addEventBox">
        <form onSubmit={handleFormSubmit} id = "eventForm">
          <label id = "headerAE">Adaugă un eveniment</label>
            <label id = "butonPozaAE" htmlFor="pictureInput" className="btn"/>
            {photo && <img id = "PozaAE" src={photo} alt="EventPhoto"/>}
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
            <select id = "selectAE" onChange={handleChange} name="category">
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


function convertTo64(file)
{
  return new Promise((resolve, reqject) =>
  {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () =>
    {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => 
    {
      reqject(error)
    } 
  })
}