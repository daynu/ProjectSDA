import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

function EventCarousel({events})
{
  return (
    <Carousel>
      {events.map((event, i) =>
      (
        <Carousel.Item>
          <a href={`/event/${event._id}`}>
          <Carousel.Caption>
            <p>{event.title}</p>
            <p>{event.date}</p>
          </Carousel.Caption>
          <img
            key={i}
            className="d-block w-100 h-100"
            src={event.picture}
            alt="First slide"
          />
          </a>
      </Carousel.Item>
      ))}
      
    </Carousel>
  );
  }


export default EventCarousel;