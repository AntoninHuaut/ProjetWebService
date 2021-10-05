import {
    Navbar,
    Container,
    Nav
} from "react-bootstrap";
import { isConnected, logout } from "../api/userService";
import { useHistory } from "react-router";


const NavBar = () => {

    const history = useHistory();

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
                {isConnected() && 
                    <Nav className="ms-auto">
                        <Nav.Link
                            onClick={() => logout(history)}
                        >
                            Logout
                        </Nav.Link>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
}

export default NavBar;