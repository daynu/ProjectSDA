import { useState } from "react";

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
      <input onChange={handleSearchChange} type="text" placeholder="Search events" />
      {searchEvents.length > 0 && (
        <div id="searchedEvents">
          {searchEvents.map((event) => (
            <a href={`/event/${event._id}`}>
            <div className="searchEventDiv" key={event.id}>
                <p>{event.title}</p>
            </div>
            </a>
          ))}
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
