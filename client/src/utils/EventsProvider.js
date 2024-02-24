
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/events`).then((res) => {
      setEventsData(res.data);
    });
  }, []);

  return <EventsContext.Provider value={eventsData}>{children}</EventsContext.Provider>;
};

export const useEvents = () => {
  return useContext(EventsContext);
};

