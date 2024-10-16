import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Card, Carousel, Col, Container, Row } from 'react-bootstrap';

import { getAllRooms } from '../utils/ApiFunctions';

const RoomCarousel = () => {
    const [rooms, setRooms] = useState([]);
    const [errorMessage, setErroMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getAllRooms().then((data) => {
            setRooms(data);
            setIsLoading(false);
        }).catch((error) => {
            setErroMessage(error.message);
            setIsLoading(false);
        });
    }, [])

    if(isLoading) {
        return <div className='mt-5'>Content is being loaded...</div>
    }

    if(errorMessage) {
        return <div className='text-danger mb-5 mt-5'>Something went wrong: {errorMessage}</div>
    }

    return (
        <section className='bg-light mb-5 mt-5 shadow'>
            <Link to={"/browse-all-rooms"} className='hotel-color text-center'>
                Browse all rooms
            </Link>

            <Container>
                <Carousel indicators={false}>
                    {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
                        <Carousel.Item key={index}>
                            <Row>
                                {rooms.slice(index * 4, index * 4 + 4).map((room) => (
                                    <Col key={room.id} className='mb-4' xs={12} md={6} lg={3}>
                                        <Card>
                                            <Link to={`/book-room/${room.id}`}>
                                                <Card.Img 
                                                    variant='top'
                                                    src={`data:image/png;base64, ${room.photo}`}
                                                    alt='room photo'
                                                    className='w-100'
                                                    style={{height: "200px"}}
                                                />
                                            </Link>

                                            <Card.Body>
                                                <Card.Title className='hotel-color'>{room.roomType}</Card.Title>

                                                <Card.Title className='room-price'>{`Rs.${room.roomPrice}/Night`}</Card.Title>

                                                <div className='flex-shrink-0'>
                                                    <Link to={`/book-room/${room.id}`} className='btn btn-hotel btn-sm'>
                                                        View/Book Now
                                                    </Link>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>
        </section >
    )
}

export default RoomCarousel