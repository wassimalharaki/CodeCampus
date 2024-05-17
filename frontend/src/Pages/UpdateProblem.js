import Header from "../Components/Header";
import { useSelector } from 'react-redux';
import { currentUser } from '../Store/UserSlice';
import "./UpdateProblem.css"
import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import Testcase from "../Components/Testcase.js"
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export default function UpdateProblem() {
    const user = useSelector(currentUser);
    const [testcases, setTestcases] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [tags, setTags] = useState("");
    const [statement, setStatement] = useState("");
    const navigate = useNavigate();
    const id = location.pathname.split("/")[2];

    useEffect(() => {
        axios.get('http://localhost:3001/api/problem/' + id)
        .then(res => {
            setName(res.data.name);
            setVisible(res.data.visible);
            setStatement(res.data.statement);
            setTags(res.data.tags);
            var tc = [];
            res.data.tcs.forEach(t => {
                tc.push(<Testcase key = {tc.length} id = {tc.length} i = {t.input} o = {t.output}></Testcase>)
            });
            setTestcases(tc);
        });
    }, []);

    function addTestcase() {
        setTestcases([...testcases, <Testcase key = {testcases.length} id = {testcases.length}/>]);
    }

    function remTestcase() {
        setTestcases(testcases.splice(testcases.pop()));
    }

    function handleUpdate() {
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

        axios.put('http://localhost:3001/api/problem/' + id, {
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
        <div className = "up-parent">
            <Header/>
            <div className = "up-body">
                <p className = "up-form-header">Update Problem</p>
                <div className = "up-inner-body">
                    <div className = "up-left">
                        <div className = "up-input">
                            <p className = "up-p-input">Name</p>
                            <input className = "up-txt-input" placeholder="Ex: A + B" value = {name} onChange = {e => setName(e.target.value)}></input>
                        </div>
                        <div className = "up-input">
                            <p className = "up-p-input">Tags</p>
                            <input className = "up-txt-input" placeholder="Ex: Linked List, Greedy, Implementation" value = {tags} onChange = {e => setTags(e.target.value)}></input>
                        </div>
                        <div className = "up-input">
                            <p className = "up-p-input">Statement</p>
                            <textarea className = "up-statement" placeholder="Ex: Given 2 integers, output their sum." value = {statement} onChange = {e => setStatement(e.target.value)}></textarea>
                        </div>
                        <div className = "up-input">
                        <Form.Check
                            className = "up-check"
                            type={"checkbox"}
                            checked={visible}
                            label={"Visible"}
                            onChange={(e) => setVisible(e.target.checked)}
                        />
                        </div>
                        <div style = {{height: 150 + 'px'}}>
                            <Button className = "up-btn-update" onClick={() => handleUpdate()}>UPDATE</Button>
                        </div>
                    </div>

                    <div className = "up-right">
                        <p className = "up-tc-title">Testcases</p>
                        <div className = "up-btn-container">
                            <Button className = "up-btn-addtc" onClick={() => addTestcase()}><p className="up-btn-title">+</p></Button>
                            <Button className = "up-btn-remtc btn-danger" onClick={() => remTestcase()}><p className="up-btn-title">-</p></Button>
                        </div>
                        {testcases.map(tc => {
                            return (
                                <div className = "up-input">
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