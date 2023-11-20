import { useState } from "react";

import Magnifying from '../img/Magnifying.svg.png'

function SearchEventsBar({ events }) {
  const [search, setSearch] = useState('');
  const [searchEvents, setSearchEvents] = useState([]);

  function handleSearchChange(e) {
    const updatedSearch = e.target.value;
    setSearch(updatedSearch);

    const results = getSearchEvents(updatedSearch, events);
    setSearchEvents(results);
  }

  return (
    <div id="searchBar">
      <div id="searchMain">
        <img src={Magnifying} />
        <input id="searchArea" onChange={handleSearchChange} type="text" placeholder="Search events" />
      </div>
      
      {searchEvents.length > 0 && search !== '' ? (
        <div id="searchedEvents">
          {searchEvents.map((event) => (  
            <a href={`/event/${event._id}`}>
            <div className="searchEventDiv" key={event.id}>
                <p>{event.title}</p>
            </div>
            </a>
          ))}
        </div>
      ):
      search !== '' &&
      (
        
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
