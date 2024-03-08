import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Login2.css'

const Login2: React.FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const handleCheckboxChange = () => {
        setIsLogin(!isLogin);
    };

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Login işlemleri
    };

    const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Kayıt işlemleri
    };

    return (
        <div className="section">
            <div className="container">
                <div className="row full-height justify-content-center">
                    <div className="col-12 text-center align-self-center py-5">
                        <div className="section pb-5 pt-5 pt-sm-2 text-center">
                            <h6 className="mb-0 pb-3">
                                <span>Log In </span>
                                <span>Sign Up</span>
                            </h6>
                            <input
                                className="checkbox"
                                type="checkbox"
                                id="reg-log"
                                name="reg-log"
                                checked={!isLogin}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="reg-log"></label>
                            <div className="card-3d-wrap mx-auto">
                                <div className="card-3d-wrapper">
                                    <div className="card-front">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 className="mb-4 pb-3">Log In</h4>
                                                <Form onSubmit={handleLogin}>
                                                    <Form.Group controlId="email">
                                                        <Form.Control
                                                            type="email"
                                                            placeholder="Email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                        <i className="input-icon uil uil-at"></i>
                                                    </Form.Group>
                                                    <Form.Group controlId="password">
                                                        <Form.Control
                                                            type="password"
                                                            placeholder="Password"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        />
                                                        <i className="input-icon uil uil-lock-alt"></i>
                                                    </Form.Group>
                                                    <Button type="submit" className="btn mt-4">
                                                        Login
                                                    </Button>
                                                </Form>
                                                <p className="mb-0 mt-4 text-center">
                                                    <a href="https://www.web-leb.com/code" className="link">
                                                        Forgot your password?
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-back">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 className="mb-3 pb-3">Sign Up</h4>
                                                <Form onSubmit={handleSignUp}>
                                                    <Form.Group controlId="fullName">
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Full Name"
                                                            value={fullName}
                                                            onChange={(e) => setFullName(e.target.value)}
                                                        />
                                                        <i className="input-icon uil uil-user"></i>
                                                    </Form.Group>
                                                    <Form.Group controlId="phoneNumber">
                                                        <Form.Control
                                                            type="tel"
                                                            placeholder="Phone Number"
                                                            value={phoneNumber}
                                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                                        />
                                                        <i className="input-icon uil uil-phone"></i>
                                                    </Form.Group>
                                                    <Form.Group controlId="signUpEmail">
                                                        <Form.Control
                                                            type="email"
                                                            placeholder="Email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                        <i className="input-icon uil uil-at"></i>
                                                    </Form.Group>
                                                    <Form.Group controlId="signUpPassword">
                                                        <Form.Control
                                                            type="password"
                                                            placeholder="Password"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        />
                                                        <i className="input-icon uil uil-lock-alt"></i>
                                                    </Form.Group>
                                                    <Button type="submit" className="btn mt-4">
                                                        Register
                                                    </Button>
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login2;
