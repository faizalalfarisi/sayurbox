import React, { Component } from 'react'
import { Container, Row, Col, Form, FormControl } from 'react-bootstrap';
import { API_URL, API_KEY } from '../service/constants'
import axios from 'axios'
import NavbarComponent from './NavbarComponent'
import Movies from './Movies'
import MoviesDetail from './MoviesDetail'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'


export default class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movies: [],
            search: '',
        }
    }

    componentDidMount() {
        axios
            .get(API_URL, {
                params: {
                    apikey: API_KEY,
                    s: 'Batman',
                    page: 2
                }
            })
            .then(res => {
                const movies = res.data.Search;
                this.setState({ movies });
            })
            .catch(error => {
                console.log("Error API List Movies", error);
            })
    }

    onchange = e => {
        this.setState({ search: e.target.value });
    };

    render() {
        const { movies } = this.state
        const { search } = this.state
        const filteredMovies = movies.filter(movie => {
            return movie.Title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
        return (
            // <React.Fragment>
            //     <NavbarComponent />
            //     <Switch>
            //         <Route path='/movies' component={Movies}></Route>
            //         <Route path='/movies-detail' component={MoviesDetail}></Route>
            //     </Switch>
            // </React.Fragment>
            <div className="App">
                <NavbarComponent />
                <div className="mt-3">
                    <Container fluid>
                        <Row>
                            <Col>
                                <Row md={4} xs={6} className="mb-4">
                                    <Form inline>
                                        <FormControl type="text" placeholder="Search Movie" className="mr-sm-2" onChange={this.onchange} />
                                    </Form>
                                </Row>
                                <Row>
                                    {movies && filteredMovies.map((movie) => (
                                        <Movies
                                            key={movie.imdbID}
                                            movie={movie}
                                        />
                                    ))}
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}