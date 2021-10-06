import {
    Navbar,
    Container,
    Nav
} from "react-bootstrap";
import { logout } from "../api/userService";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";


const NavBar = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    
    const user = useSelector((state: any) => {
        return state.currentUser;
    });

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
                    <Nav.Link href="/#/author">Author</Nav.Link>
                    <Nav.Link href="/#/book">Book</Nav.Link>
                    {user.user.role >= 4  &&<Nav.Link href="/#/users">Users</Nav.Link>}
                </Nav>
                {user.loggedIn && 
                    <Nav className="ms-auto">
                        <Nav.Link
                            onClick={() => logout(history, dispatch)}
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