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

  const query = search.toLowerCase();

  return events.filter((event) => event.title.toLowerCase().includes(query));
}

export default SearchEventsBar;
