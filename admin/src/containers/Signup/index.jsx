import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import { signUp } from '../../redux/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';

const Signup = () => {
    const initialState = { email: "", password: "", lastName: "", firstName: "", confirmPassword: "" };
    const dispatch = useDispatch();
    const history = useHistory();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [formAuth, setFormAuth] = useState(initialState);
    const { email, password, lastName, firstName, confirmPassword } = formAuth;

    const handleChangeInput = (e) => {
        setFormAuth({ ...formAuth, [e.target.name]: e.target.value });
        // const { value, name } = e.target;
        // setFormAuth({ ...formAuth, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signUp(formAuth, history));
    };

    if (isAuthenticated) { return <Redirect to={`/`} /> };

    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1>Register</h1>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col>
                                    <Input
                                        laybel='First Name'
                                        placeholder="First Name"
                                        value={firstName}
                                        type="text"
                                        name="firstName"
                                        onChange={handleChangeInput}
                                    />
                                </Col>
                                <Col>
                                    <Input
                                        laybel='Last Name'
                                        placeholder="Last Name"
                                        value={lastName}
                                        name="lastName"
                                        type="text"
                                        onChange={handleChangeInput}
                                    />
                                </Col>
                            </Row>
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
                                type="password"
                                name="password"
                                onChange={handleChangeInput}
                            />

                            <Input
                                laybel='Confirm Password'
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                type="password"
                                name="confirmPassword"
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

export default Signup
