import React from 'react';
import NavbarMenu from '../Navbar';
import { Col, Container, Row } from 'react-bootstrap';
import './styles.css';
import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';

const Layout = ({ children, isSideBar }) => {
    // const { isAuthenticated } = useSelector((state) => state.auth);
    return (
        <>
            <NavbarMenu />
            {isSideBar ?
                <Container fluid>
                    <Row>
                        <Col md={2} className="sidebar">
                            <ul>
                                <li><NavLink exact to={`/`}>Home</NavLink></li>
                                <li><NavLink to={`/page`}>Page</NavLink></li>
                                <li><NavLink to={`/category`}>Category</NavLink></li>
                                <li><NavLink to={`/products`}>Products</NavLink></li>
                                <li><NavLink to={`/orders`}>Orders</NavLink></li>
                            </ul>
                        </Col>
                        <Col md={10} style={{ marginLeft: 'auto', paddingTop: '60px' }}>
                            {children}
                        </Col>
                    </Row>
                </Container>
                :
                (children)
            }

        </>
    )
}

export default Layout
