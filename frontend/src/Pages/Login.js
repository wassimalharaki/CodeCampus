import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from '../Components/Header';
import './Login.css';
import { useDispatch } from 'react-redux';
import { login } from '../Store/UserSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const handleLogin = async () => {
        axios.post('http://localhost:3001/api/auth/login', {
            "email": email,
            "password": password
        }).then(res => {
            dispatch(login({
                user: res.data
            }));
            navigate('/editor');
        }).catch(err => {
            Swal.fire({
                icon: "error",
                title: "Invalid Credentials",
            });
        });
    };
    return (
        <div className = "login-parent">
            <Header/>
            <div className = "login-body">
                <Form className = "login-form">
                    <Form.Label className = "login-title">Login</Form.Label>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="lg-title">Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value = {email} className = "input-email" onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="lg-title">Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" value = {password} className = "input-password" onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" className = "btn-submit lg-btn-submit" onClick={() => handleLogin()}>
                        Enter
                    </Button>
                </Form>
            </div>
        </div>
    );
}