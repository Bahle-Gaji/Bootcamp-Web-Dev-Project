import React, { useState, useEffect } from "react";
import MoviesDataService from '../services/movies';
import { Link } from 'react-router-dom';
import { Form, Button, Col, Row, Container, Card } from 'react-bootstrap';

const MoviesList = (props) => {
    const [movies, setMovies] = useState([])
    const [searchTitle, setSearchTitle] = useState("")
    const [searchRating, setSearchRating] = useState("")
    const [ratings, setRatings] = useState(["All Ratings"])

    useEffect(() => {
        retrieveMovies()
        retrieveRatings()
    }, [])

    const retrieveMovies = () => {
        MoviesDataService.getAll()
            .then(res => {
                console.log(res.data)
                setMovies(res.data.movies)
            })
            .catch(e =>
                console.log(e)
            )
    }

    const retrieveRatings = () => {
        MoviesDataService.getRatings()
            .then(res => {
                console.log(res.data)
                //start with 'All ratings' if user doesn't specify any ratings
                setRatings(['All Ratings'].concat(res.data))
            })
            .catch(e => console.log(e))
    }

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value
        setSearchTitle(searchTitle)
    }

    const onChangeSearchRating = e => {
        const searchRating = e.target.value
        setSearchRating(searchRating)
    }


    const find = (query, by) => {
        MoviesDataService.find(query, by)
        .then(res => {
            console.log(res.data)
            setMovies(res.data.movies)
        })
        .catch(e => console.log(e))
    }

    const findByTitle = () => {
        find(searchTitle, 'title')
    }

    const findByRating = () => {
        if(searchRating === "All Ratings"){
            retrieveMovies()
        }
        else{
            find(searchRating, 'rated')
        }
    }


    return (
        <div className="App">
            <Container>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control type="text" placeholder="Search by title" value={searchTitle} onChange={onChangeSearchTitle} />
                            </Form.Group>
                            <Button variant="primary" type="button" onClick={findByTitle}>
                                Search
                            </Button>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control as="select" onChange={onChangeSearchRating} >
                                    {ratings.map(rating => { return (<option value={rating}>{rating}</option>) })}
                                </Form.Control>
                            </Form.Group>
                            <Button variant="primary" type="button" onClick={findByRating}>
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>

                <Row>
                    {movies.map(movie => {
                        return (
                            <Col>
                            <Card style={{width: '18rem'}}>
                                <Card.Img src={movie.poster+"/100px180"}/>
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Text>
                                        Rating: {movie.rated}
                                    </Card.Text>
                                    <Card.Text>{movie.plot}</Card.Text>
                                    <Link to={'/movies'+movie._id}>View Reviews</Link>
                                </Card.Body>
                            </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </div>
    )
}

export default MoviesList;