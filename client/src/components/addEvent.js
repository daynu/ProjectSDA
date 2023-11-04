import axios from "axios";
import { useState } from "react";

export default function AddEvent()
{

    const [formData, setFormData] = useState({
        title: '',
        date: '',
      });

    const handleFormSubmit = (e) =>
      {
        e.preventDefault()

        try
        {
            axios.post('/addevent', formData)
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

    return(
        <form onSubmit={handleFormSubmit} id = "projectForm">
            <input onChange={handleChange} name = "title" placeholder="title" type="text" />
            <input onChange={handleChange} name = "date" type="date" />
        </form>
    )
}