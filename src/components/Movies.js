import React, { Component } from 'react'
import store from '../store/index'
import image from '../content/poster.jpg'
import { Link } from 'react-router-dom'
import { url } from '../service/constants'
import { Col, Card, CardGroup, Form, FormControl,  Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'

export default class Movies extends Component {
    constructor(props) {
        super(props)

        this.state = {
            listMovies: [],
            search: ''
        }
        
        // Query List Movie
        this.queryListMovie = `
            query ($id: Int, $page: Int, $perPage: Int, $search: String) {
                Page (page: $page, perPage: $perPage) {
                    pageInfo {
                        total
                        currentPage
                        lastPage
                        hasNextPage
                        perPage
                    }
                    media (id: $id, search: $search) {
                        id
                        title {
                        romaji
                        }
                    }
                }
            }
        `

        // Variabel List Movie
        this.varListMovie = {
            search: "Fate/Zero",
            page: 1,
            perPage: 8
        };

        this.optionListMovie = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: this.queryListMovie,
                variables: this.varListMovie
            })
        };
    }

    componentDidMount() {
        // Get Data List Movie Anime
        fetch(url, this.optionListMovie)
            .then((response) => response.json())
            .then((data) => {
                const listMovies = data.data.Page.media;
                this.setState({ listMovies });
        });
    }

    onchange = e => {
        this.setState({ search: e.target.value });
    };

    detailMovies = (id) => {
        // Query Detail Movie
        this.queryDetailMovie = `
            query ($id: Int) { # Define which variables will be used in the query (id)
                Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
                    id
                    title {
                    romaji
                    english
                    native
                    }
                }
            }
        `

        // Variabel Detail Movie
        this.varDetailMovie = {
            id: id
        };
        
        // Config API Request Detail Movie
        this.optionDetail = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: this.queryDetailMovie,
                variables: this.varDetailMovie
            })
        };

        fetch(url, this.optionDetail)
            .then((response) => response.json())
            .then((data) => {
                store.dispatch({
                    type: 'Detail Page',
                    data: data.data.Media
                });
        });
    }

    handleResponse = (response) => {
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }

    handleData = (data) => {

    }

    handleError = (error) => {
        alert(error);
    }

    render() {
        const { listMovies } = this.state
        const { search } = this.state
        
        // Filter movie
        const filteredMovies = listMovies.filter(movie => {
            return movie.title.romaji.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });

        return (
            <React.Fragment>
                <Navbar variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home"><strong>Anime 2022</strong></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="#home">Tv Series</Nav.Link>
                                <Nav.Link href="#link">Bioskop21</Nav.Link>
                                <NavDropdown title="Genre" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Scify</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Romantic</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Comedy</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Form inline>
                                <FormControl type="text" placeholder="Search Movie" className="mr-sm-2" onChange={this.onchange} />
                            </Form>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <CardGroup>
                     {listMovies && filteredMovies.map((movie) => (
                        <Col md={3} xs={6} className="mb-4 mt-4">
                            <Card>
                                <Link to="/movies-detail"><Card.Img variant="top" src={image} style={{ height: '500px' }} onClick={() => this.detailMovies(movie.id)} /></Link>
                                <Card.Body>
                                    <Card.Title>{movie.title.romaji}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </CardGroup>
            </React.Fragment>
        )
    }
}
