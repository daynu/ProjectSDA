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
    <div>
      <input onChange={handleSearchChange} type="text" placeholder="Search events" />
      {searchEvents.length > 0 && (
        <ul>
          {searchEvents.map((event) => (
            <li key={event.id}>{event.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function getSearchEvents(search, events) {

  const query = search.toLowerCase();

  return events.filter((event) => event.title.toLowerCase().includes(query));
}

export default SearchEventsBar;
