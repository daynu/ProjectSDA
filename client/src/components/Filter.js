import { useState } from "react"


function Filter({toggleFilter, setFilterPreferences})
{

    const [category, setCategory] = useState('Muzica')
    const [date, setDate] = useState('today')


    function handleSubmit(e)
    {
        e.preventDefault()
        setFilterPreferences(
            {
                category: category,
                date: date
            }
        )
        toggleFilter()

    }

    function clearPreferences() {
      setFilterPreferences({ category: '', date: '' });
      toggleFilter()
    }

    function handleCategoryChange(e) {
        const categoryValue = e.target.value;
        console.log('Category changed to:', categoryValue);
        setCategory((prevCategory) => {
          console.log('Previous category state:', prevCategory);
          return categoryValue;
        });
      }

      function handleDateChange(e) {
        const dateValue = e.target.value;
        console.log('Date changed to:', dateValue);
        setDate((prevDate) => {
          console.log('Previous date state:', prevDate);
          return dateValue;
        });
      }

    return(

        <>
            <form onSubmit={handleSubmit}>
            <select onChange={handleCategoryChange} name="category">
              <option value="Muzica">Muzică</option>
              <option value="Teatru">Teatru</option>
              <option value="Sport">Sport</option>
              <option value="Altele">Altele</option>
            </select>
            <label>Data</label>
            <select onChange={handleDateChange} name="date">
              <option value="today">Astăzi</option>
              <option value="tomorrow">Mâine</option>
              <option value="thisWeek">Săptămâna aceasta</option>
            </select>
            <input type="submit" value="Caută" />
            </form>
            <button onClick={clearPreferences}>Reset</button>
        </>
    )

}


export default Filter