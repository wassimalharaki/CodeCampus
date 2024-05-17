import Header from "../Components/Header";
import './CreateExam.css';
import { useSelector } from 'react-redux';
import { currentUser } from '../Store/UserSlice';
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import MiniTable from "../Components/MiniTable";

export default function CreateExam() {
    const user = useSelector(currentUser);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    const [users, setUsers] = useState([]);
    const [problems, setProblems] = useState([]);

    function handleCreate() {
        if (name.trim().length == 0 || start.trim().length == 0
                || end.trim().length == 0 || users.length == 0
                || problems.length == 0 || end <= start) {

            Swal.fire({
                icon: "error",
                title: "Invalid input",
                text: "Fill all fields."
            });
            return;
        }

        axios.post('http://localhost:3001/api/exam/', {
            "user_id": user.user._id,
            "name": name.trim(),
            "start_time": start.trim(),
            "end_time": end.trim(),
            "users": users,
            "problems": problems
        }).then(res => {
            navigate('/examset');
        });
    }

    async function addUser() {
        for await (const u of users) {
            if (u == email) {
                Swal.fire({
                    icon: "error",
                    title: "User already exists",
                });
                return;
            }
        }

        axios.post('http://localhost:3001/api/user/find', {
            "email": email
        }).then(res => {
            if (res.data == "OK") {
                setUsers([...users, email]);
                setEmail("");
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Invalid email",
                });
            }
        });
    }

    function removeUser() {
        setUsers(users.filter(u => {
            return u != email;
        }));
    }

    async function addProblem() {
        for await (const p of problems) {
            if (p == id) {
                Swal.fire({
                    icon: "error",
                    title: "Problem already exists",
                });
                return;
            }
        }

        axios.post('http://localhost:3001/api/problem/find', {
            "id": id
        }).then(res => {
            if (res.data == "OK") {
                setProblems([...problems, id]);
                setId("");
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Invalid problem ID",
                });
            }
        });
    }

    function removeProblem() {
        setProblems(problems.filter(p => {
            return p != id;
        }));
    }
    
    return (
        <div className = "ce-parent">
            <Header/>
            <div className = "ce-body">
                <p className = "ce-title">Create Exam</p>
                <div className="ce-inner-body">
                    <div className="ce-left">
                        <div className = "ce-input">
                            <p className = "ce-p-input">Name</p>
                            <input className = "ce-txt-input" placeholder="Ex: Intro to Programming Lab" value = {name} onChange = {e => setName(e.target.value)}></input>
                        </div>

                        <div className = "ce-input">
                            <p className = "ce-p-dt-input">Starting Time</p>
                            <Form.Control type="datetime-local" className = "ce-dt-input" value = {start} onChange = {(e) => setStart(e.target.value)}/>
                        </div>

                        <div className = "ce-input">
                            <p className = "ce-p-dt-input">Ending Time</p>
                            <Form.Control type="datetime-local" className = "ce-dt-input" value = {end} onChange = {(e) => setEnd(e.target.value)}/>
                        </div>
                        <Button className = "ce-btn-create" onClick={() => handleCreate()}>Create</Button>
                    </div>
                    <div className="ce-middle">
                        <div className = "ce-input">
                            <p className = "ce-p-input">Email</p>
                            <input className = "ce-txt-input" placeholder="Enter student email" value = {email} onChange = {e => setEmail(e.target.value)}></input>
                        </div>
                        <div className = "ce-std-cont">
                            <Button className = "ce-std-add" onClick={() => addUser()}>Add</Button>
                            <Button className = "ce-std-rem btn-danger" onClick={() => removeUser()}>Remove</Button>
                        </div>
                        <MiniTable name = {"Email"} fill = {users}></MiniTable>
                    </div>
                    <div className="ce-right">
                        <div className = "ce-input">
                            <p className = "ce-p-input ce-pid-p">Problem ID</p>
                            <input className = "ce-txt-input ce-pid-input" placeholder="Enter problem ID" value = {id} onChange = {e => setId(e.target.value)}></input>
                        </div>
                        <div className = "ce-prob-cont">
                            <Button className = "ce-prob-add" onClick={() => addProblem()}>Add</Button>
                            <Button className = "ce-prob-rem btn-danger" onClick={() => removeProblem()}>Remove</Button>
                        </div>
                        <MiniTable name = {"Problem ID"} fill = {problems}></MiniTable>
                    </div>
                </div>
            </div>
        </div>
    );
}