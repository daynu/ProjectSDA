import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'

function App() {

  const [usersData, setUsersData] = useState([{}])

  const [eventsData, setEventsData] = useState([{}])

  useEffect(()=>
  {
    fetch('/api/users').then((response)=>
    {
      response.json().then((data) =>
      {
        setUsersData(data)
      })
    })

    fetch('/api/events').then((response)=>
    {
      response.json().then((data)=>
      {
        setEventsData(data)
      })
    })
  }, [])

  return (
    <>
    <Navbar />
    <div>
      {(typeof usersData === 'undefined') ? (<p>Loading...</p>)
      : (usersData.map((user, i)=>
      (
        <p key = {i}>{user.name}</p>
      )))}
      {(typeof eventsData === 'undefined') ? (<p>Loading...</p>)
      : (eventsData.map((event, i)=>
      (
        <p key = {i}>{event.name}</p>
      )))}
    </div>
    </>
  )
}

export default App
