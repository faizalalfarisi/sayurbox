import React from 'react'
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'

function Header () {
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
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </React.Fragment>
    )
}

export default Header
