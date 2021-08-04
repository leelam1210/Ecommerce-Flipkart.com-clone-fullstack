import React, { useState, useEffect } from 'react'
import { Container, Form, Button, Row, Col, } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import { signIn } from '../../redux/actions/';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import Layout from '../../components/Layout';

const Signin = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [formAuth, setFormAuth] = useState({
        email: "",
        password: '',
    });
    const { email, password } = formAuth;
    // const [error, setError] = useState('');
    const handleChangeInput = (e) => {
        setFormAuth({ ...formAuth, [e.target.name]: e.target.value });
        // const { value, name } = e.target;
        // setFormAuth({ ...formAuth, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signIn(formAuth));
    };

    // dung Redirect khi render thi kh bi nhay ve signIn
    if (isAuthenticated) { return <Redirect to={`/`} /> }
    // useEffect(() => {
    //     if (isAuthenticated) history.push('/');
    // }, [isAuthenticated, history]);

    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1>Login to Admin Dashboard</h1>
                        <Form onSubmit={handleSubmit}>
                            <Input
                                laybel='Email'
                                placeholder="Email"
                                value={email}
                                name="email"
                                type="email"
                                onChange={handleChangeInput}
                            />

                            <Input
                                laybel='Password'
                                placeholder="Password"
                                value={password}
                                name="password"
                                type="password"
                                onChange={handleChangeInput}
                            />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Signin
