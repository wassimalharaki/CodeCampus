import { useState } from "react";
import Header from "../Components/Header";
import "./AddUser.css"
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function AddUser() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Student");
    const navigate = useNavigate();

    function handleCreate() {
        var match = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim());
        if (email.trim().length == 0 || password.trim().length == 0 || !match) {
            Swal.fire({
                icon: "error",
                title: "Invalid input",
                text: "Fill all fields and make sure email is valid"
            });
            return;
        }

        axios.post('http://localhost:3001/api/user/', {
            email, password, role
        }).then(res => {
            navigate('/users');
        }).catch(err => {
            Swal.fire({
                icon: "error",
                title: "Invalid input",
                text: "Fill all fields and make sure email is valid"
            });
        });
    }

    return (
        <div className = "au-parent">
            <Header/>
            <div className = "au-body">
                <p className = "au-title">Add User</p>
                <div className = "au-input-container">
                    <p className = "au-input">Email</p>
                    <input className = "au-txt-input" placeholder="Enter email" value = {email} onChange = {e => setEmail(e.target.value)}></input>
                    
                </div>
                <div className = "au-input-container">
                    <p className = "au-input">Password</p>
                    <input className = "au-txt-input" placeholder="Enter password" value = {password} onChange = {e => setPassword(e.target.value)}></input>
                    
                </div>
                <div className = "au-input-container">
                    <p className = "au-input">Role</p>
                    <DropdownButton className = "au-input-role" title = {role}>
                        <Dropdown.Item onClick={() => setRole("Student")}>Student</Dropdown.Item>
                        <Dropdown.Item onClick={() => setRole("Instructor")}> Instructor</Dropdown.Item>
                        <Dropdown.Item onClick={() => setRole("Admin")}>Admin</Dropdown.Item>
                    </DropdownButton>
                </div>
                <Button className="au-create-btn" onClick={() => handleCreate()}>Create</Button>
            </div>
        </div>
    )
}