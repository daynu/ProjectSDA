import axios from "axios";
import { useState } from "react";

export default function AddEvent({fetchEvents})
{

    const [formData, setFormData] = useState({
        title: '',
        date: '',
        picture: '',
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
        <form onSubmit={handleFormSubmit} id = "projectForm">
            <input onChange={handleFileChange} type="file" accept=".jpeg, .jpg, .png"/>
            <input onChange={handleChange} name = "title" placeholder="title" type="text" required/>
            <input onChange={handleChange} name = "date" type="date" required/>
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