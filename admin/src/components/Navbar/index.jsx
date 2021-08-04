import React from 'react'
import { Navbar, Nav, Container } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { signOut } from '../../redux/actions/authAction';

const NavbarMenu = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);
    return (
        <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark" style={{ zIndex: 1 }}>
            <Container fluid>
                <Link to="/" className="navbar-brand">Admin Dashboard</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    {
                        !isAuthenticated ? (
                            <Nav>
                                <li className="nav-item">
                                    <NavLink to="/signin" className="nav-link">SignIn</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/signup" className="nav-link">SignUp</NavLink>
                                </li>
                            </Nav>
                        ) : (
                            <Nav>
                                <li className="nav-item">
                                    <NavLink to="/signin" className="nav-link" onClick={() => dispatch(signOut(history))}>Signout</NavLink>
                                </li>
                            </Nav>
                        )
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarMenu
