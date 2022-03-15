import React from 'react'
import image from '../content/poster.jpg'
import Header from './Header'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'

function MoviesDetail () {
    let dataTitle = ''

    const state = useSelector((state) => state.counter);

    if (state !== undefined && state !== null) {
        dataTitle = state.title.english
    } else {
        dataTitle = 'Not Found'
    }
    
    return (
        <React.Fragment>
            <Header />
            <Card className="text-center">
                <Card.Header>Detail Movies</Card.Header>
                <Card.Body>
                    <Card.Img variant="top" src={image} style={{ height: '500px', width: '500px', marginBottom: '20px' }} />
                    <Card.Title>{dataTitle}</Card.Title>
                    <Card.Text>
                        16 Maret 2022
                    </Card.Text>
                    <Link to='/movies'> <Button variant="success">Back To List</Button></Link>
                </Card.Body>
                <Card.Footer className="text-muted">Animelist 2022</Card.Footer>
            </Card>
        </React.Fragment>
    )
}

export default MoviesDetail
