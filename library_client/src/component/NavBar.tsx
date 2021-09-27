import React from 'react';
import {
    Navbar,
    Container,
    Nav
} from "react-bootstrap";


const NavBar = () => {

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Library de quality</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/publisher">Publisher</Nav.Link>
                    <Nav.Link href="/users">Users</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;