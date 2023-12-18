function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }


function getSearchEvents(search, events) {
      const query = normalizeString(search).toLowerCase();
  
    return events.filter((event) => {
      const normalizedTitle = normalizeString(event.title).toLowerCase();
      return normalizedTitle.includes(query);
    });
  }

export { getSearchEvents, normalizeString };