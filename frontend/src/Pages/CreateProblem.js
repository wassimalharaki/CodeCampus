import Header from "../Components/Header";
import { useSelector } from 'react-redux';
import { currentUser } from '../Store/UserSlice';
import "./CreateProblem.css"
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import Testcase from "../Components/Testcase.js"
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export default function CreateProblem() {
    const user = useSelector(currentUser);
    const [testcases, setTestcases] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [tags, setTags] = useState("");
    const [statement, setStatement] = useState("");
    const navigate = useNavigate();

    function addTestcase() {
        setTestcases([...testcases, <Testcase key = {testcases.length} id = {testcases.length}/>]);
    }

    function remTestcase() {
        setTestcases(testcases.splice(testcases.pop()));
    }

    function handleCreate() {
        var tcs = [];
        for (var i = 0; i < testcases.length; i++) {
            const id = testcases[i].key;
            const input = document.getElementById(id + 'i').value;
            const output = document.getElementById(id + 'o').value;
            tcs.push({input, output});
        }

        function check(s) {
            return s.trim().length === 0;
        }

        if (tcs.length === 0 || check(name) || check(tags) || check(statement)) {
            Swal.fire({
                icon: "error",
                title: "Invalid input",
                text: "Fill all fields and make sure at least 1 testcase exists."
            });
            return;
        }

        axios.post('http://localhost:3001/api/problem/', {
            "user_id": user.user._id,
            "name": name,
            "visible": visible,
            "tags": tags,
            "statement": statement,
            "tcs": tcs
        }).then(res => {
            navigate('/problemset');
        });
    }

    return (
        <div className = "cp-parent">
            <Header/>
            <div className = "cp-body">
                <p className = "cp-form-header">Create a Problem</p>
                <div className = "cp-inner-body">
                    <div className = "cp-left">
                        <div className = "cp-input">
                            <p className = "cp-p-input">Name</p>
                            <input className = "cp-txt-input" placeholder="Ex: A + B" value = {name} onChange = {e => setName(e.target.value)}></input>
                        </div>
                        <div className = "cp-input">
                            <p className = "cp-p-input">Tags</p>
                            <input className = "cp-txt-input" placeholder="Ex: Linked List, Greedy, Implementation" value = {tags} onChange = {e => setTags(e.target.value)}></input>
                        </div>
                        <div className = "cp-input">
                            <p className = "cp-p-input">Statement</p>
                            <textarea className = "cp-statement" placeholder="Ex: Given 2 integers, output their sum." value = {statement} onChange = {e => setStatement(e.target.value)}></textarea>
                        </div>
                        <div className = "cp-input">
                        <Form.Check
                            className = "cp-check"
                            type={"checkbox"}
                            value={visible}
                            label={"Visible"}
                            onChange={() => setVisible(!visible)}
                        />
                        </div>
                        <div style = {{height: 150 + 'px'}}>
                            <Button className = "cp-btn-create" onClick={() => handleCreate()}>CREATE</Button>
                        </div>
                    </div>

                    <div className = "cp-right">
                        <p className = "cp-tc-title">Testcases</p>
                        <div className = "cp-btn-container">
                            <Button className = "cp-btn-addtc" onClick={() => addTestcase()}><p className="cp-btn-title">+</p></Button>
                            <Button className = "cp-btn-remtc btn-danger" onClick={() => remTestcase()}><p className="cp-btn-title">-</p></Button>
                        </div>
                        {testcases.map(tc => {
                            return (
                                <div className = "cp-input">
                                    {tc}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}