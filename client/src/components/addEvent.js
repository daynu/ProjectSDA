import axios from "axios";
import { useState } from "react";

export default function AddEvent({fetchEvents})
{

    const [formData, setFormData] = useState({
        title: '',
        date: '',
        picture: '',
        hour: '',
        location: ''
      });

    const handleFormSubmit = (e) =>
      {
        e.preventDefault()

        try
        {
            axios.post('/addevent', formData).then(res =>
              {
                 fetchEvents()
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

        setFormData({
          ...formData,
          picture: base64
        })

      }

    return(
        <form onSubmit={handleFormSubmit} id = "eventForm">
            <input onChange={handleFileChange} type="file" accept=".jpeg, .jpg, .png" required/>
            <input onChange={handleChange} name = "title" placeholder="Nume eveniment" type="text" required/>
            <label>Data</label>
            <input onChange={handleChange} name = "date" type="date" required/>
            <label>Ora</label>
            <input onChange={handleChange} name="hour" type="time" required/>
            <input onChange={handleChange} name="location" placeholder="Locul" type="text" required />
            <input type="submit" />
        </form>
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