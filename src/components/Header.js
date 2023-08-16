import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Images from "../assets/images/logo192.png"
const Header = (props) => {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            src={Images}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="Logo reactJS"
                        />
                        ReactJS</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" activeKey={"/users"}>
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="/users">Manager Users</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                                <NavDropdown.Item href="/logout">
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Header;