import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Images from "../assets/images/logo192.png"
import { useLocation, NavLink, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { useEffect, useContext, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { handleLogoutRedux } from '../redux/actions/userAction'
const Header = (props) => {

    const navigate = useNavigate()

    const user = useSelector(state => state.user.acount)
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(handleLogoutRedux())
    }
    useEffect(() => {
        if (user && user.auth === false && window.location.pathname !== '/login') {
            navigate("/")
            toast.success("log out success")

        }
    }, [user])
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src={Images}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="Logo reactJS"
                        />
                        ReactJS
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {(user && user.auth || window.location.pathname === '/') &&

                            <>
                                <Nav className="me-auto">
                                    <NavLink to="/" className="nav-link">Home</NavLink>
                                    <NavLink to="/users" className="nav-link">Manager Users</NavLink>
                                </Nav>
                                <Nav>
                                    {user && user.email && <span className='nav-link'>Welcome {user.email}</span>}
                                    <NavDropdown title="Setting">
                                        {user && user.auth === true
                                            ? <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
                                            : <NavLink to="/login" className="dropdown-item">Login</NavLink>
                                        }

                                    </NavDropdown>
                                </Nav>
                            </>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}


export default Header;