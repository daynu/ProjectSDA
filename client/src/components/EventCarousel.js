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
          <Carousel.Caption>
            <p>{event.title}</p>
          </Carousel.Caption>
          <img
            key={i}
            className="d-block w-100 h-100"
            src={event.picture}
            alt="First slide"
          />
      </Carousel.Item>
      ))}
      
    </Carousel>
  );
  }


export default EventCarousel;