import {
    Navbar,
    Container,
    Nav
} from "react-bootstrap";


const NavBar = () => {

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/#/">
                    <img
                        src="/book.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="Book logo"
                    />{' '}
                    Book Manager
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/#/publisher">Publisher</Nav.Link>
                    <Nav.Link href="/#/book">Book</Nav.Link>
                    <Nav.Link href="/#/users">Users</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;