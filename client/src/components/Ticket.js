import { Card, ListGroup } from "react-bootstrap"

export default function Ticket()
{

    return(
      
               <Card style={{ width: '18rem', border: '2px solid #000', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', borderRadius: '15px' }}>
                 <Card.Img variant="top" src="event-image.jpg" style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }} />
                 <Card.Body>
                   <Card.Title style={{ textShadow: '1px 1px 2px #000' }}>IGANT Dinner Party</Card.Title>
                   <Card.Text>
                     Event date: June 25, 2022 <br />
                     Event time: 6:00 PM - 10:00 PM <br />
                     Event location: The Luxury Ballroom, IGANT Tower
                   </Card.Text>
                 </Card.Body>
                 <ListGroup variant="flush">
                   <ListGroup.Item style={{ borderBottomRightRadius: '15px', borderBottomLeftRadius: '15px' }}>General Admission: $50</ListGroup.Item>
                   <ListGroup.Item>VIP: $100</ListGroup.Item>
                 </ListGroup>
               </Card>
    )

}