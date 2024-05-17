import Header from "../Components/Header";
import './UpdateExam.css';
import { useSelector } from 'react-redux';
import { currentUser } from '../Store/UserSlice';
import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import MiniTable from "../Components/MiniTable";

export default function UpdateExam() {
    Date.prototype.addHours = function(h) {
        this.setTime(this.getTime() + (h * 60 * 60 * 1000));
        return this;
    }

    const user = useSelector(currentUser);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    const [users, setUsers] = useState([]);
    const [problems, setProblems] = useState([]);

    const e_id = location.pathname.split("/")[2];
    useEffect(() => {
        axios.get('http://localhost:3001/api/exam/' + e_id)
        .then(res => {
            const start = new Date(res.data.start_time);
            const end = new Date(res.data.end_time);
            start.addHours(3);
            end.addHours(3);
            
            setName(res.data.name);
            setStart(start.toISOString().slice(0, -1));
            setEnd(end.toISOString().slice(0, -1));
            setUsers(res.data.users);
            setProblems(res.data.problems);
        });
    }, []);

    function handleUpdate() {
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

        axios.put('http://localhost:3001/api/exam/' + e_id, {
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
        <div className = "ue-parent">
            <Header/>
            <div className = "ue-body">
                <p className = "ue-title">Update Exam</p>
                <div className="ue-inner-body">
                    <div className="ue-left">
                        <div className = "ue-input">
                            <p className = "ue-p-input">Name</p>
                            <input className = "ue-txt-input" placeholder="Ex: Intro to Programming Lab" value = {name} onChange = {e => setName(e.target.value)}></input>
                        </div>

                        <div className = "ue-input">
                            <p className = "ue-p-dt-input">Starting Time</p>
                            <Form.Control type="datetime-local" className = "ue-dt-input" value = {start} onChange = {(e) => setStart(e.target.value)}/>
                        </div>

                        <div className = "ue-input">
                            <p className = "ue-p-dt-input">Ending Time</p>
                            <Form.Control type="datetime-local" className = "ue-dt-input" value = {end} onChange = {(e) => setEnd(e.target.value)}/>
                        </div>
                        <Button className = "ue-btn-create" onClick={() => handleUpdate()}>Update</Button>
                    </div>
                    <div className="ue-middle">
                        <div className = "ue-input">
                            <p className = "ue-p-input">Email</p>
                            <input className = "ue-txt-input" placeholder="Enter student email" value = {email} onChange = {e => setEmail(e.target.value)}></input>
                        </div>
                        <div className = "ue-std-cont">
                            <Button className = "ue-std-add" onClick={() => addUser()}>Add</Button>
                            <Button className = "ue-std-rem btn-danger" onClick={() => removeUser()}>Remove</Button>
                        </div>
                        <MiniTable name = {"Email"} fill = {users}></MiniTable>
                    </div>
                    <div className="ue-right">
                        <div className = "ue-input">
                            <p className = "ue-p-input ue-pid-p">Problem ID</p>
                            <input className = "ue-txt-input ue-pid-input" placeholder="Enter problem ID" value = {id} onChange = {e => setId(e.target.value)}></input>
                        </div>
                        <div className = "ue-prob-cont">
                            <Button className = "ue-prob-add" onClick={() => addProblem()}>Add</Button>
                            <Button className = "ue-prob-rem btn-danger" onClick={() => removeProblem()}>Remove</Button>
                        </div>
                        <MiniTable name = {"Problem ID"} fill = {problems}></MiniTable>
                    </div>
                </div>
            </div>
        </div>
    );
}