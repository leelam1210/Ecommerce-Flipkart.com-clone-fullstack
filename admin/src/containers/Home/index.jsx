import React from 'react';
import { Container } from 'react-bootstrap';
import Layout from '../../components/Layout';

const Home = () => {
    return (
        <Layout isSideBar>
            <Container className="alert-secondary text-center" fluid>
                <h1>Welcome to Admin Dashboard</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam atque expedita, voluptas veniam quaerat possimus ipsa culpa harum doloribus rem fugit hic deleniti, sequi odit iure doloremque nulla quis itaque!</p>
            </Container>
        </Layout>
    )
}

export default Home
