import { useState, useRef } from "react";
import Magnifying from '../img/Magnifying.svg.png';

function SearchEventsBar({ events }) {
  const [search, setSearch] = useState('');
  const [searchEvents, setSearchEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(-1);


  function handleSearchChange(e) {
    const updatedSearch = e.target.value;
    setSearch(updatedSearch);

    const results = getSearchEvents(updatedSearch, events);
    setSearchEvents(results);
  }

  function handleKeyDown(e) {

    if(e.key === 'ArrowUp' && selectedEvent > 0)
    {
      setSelectedEvent(prev => prev - 1)
    }
    else if(e.key === 'ArrowDown' && selectedEvent < searchEvents.length - 1)
    {
      setSelectedEvent(prev => prev + 1)
    }
    else if(e.key === 'Enter' && selectedEvent >= 0)
    {
      window.open(`/event/${searchEvents[selectedEvent]._id}`, '_self')
    }
  }

  return (
    <div id="searchBar">
      <div id="searchMain">
        <img src={Magnifying} alt="magnifying" />
        <input
          id="searchArea"
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Caută evenimente"
        />
      </div>

      {searchEvents.length > 0 && search !== '' ? (
        <div id="searchedEvents">
          {searchEvents.map((event, index) => (
            <a href={`/event/${event._id}`} key={index}>
              <div className= {`searchEventDiv ${selectedEvent === index ? 'focused': ''}`} id={event._id}>
                <p className="foundEvent">{event.title}</p>
              </div>
            </a>
          ))}
        </div>
      ) : search !== '' && (
        <div id="searchedEvents">
          <p id="noEventSearch">Niciun eveniment găsit</p>
        </div>
      )}
    </div>
  );
}

function getSearchEvents(search, events) {
  const query = normalizeString(search).toLowerCase();

  return events.filter((event) => {
    const normalizedTitle = normalizeString(event.title).toLowerCase();
    return normalizedTitle.includes(query);
  });
}

function normalizeString(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default SearchEventsBar;
