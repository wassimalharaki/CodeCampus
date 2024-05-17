import Header from "../Components/Header";
import { useSelector } from 'react-redux';
import { currentUser } from '../Store/UserSlice';
import "./MyProblems.css"
import { Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import ProbComp from "../Components/ProbComp";

export default function MyProblems() {
    const user = useSelector(currentUser);
    const [problems, setProblems] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/api/problem/by/' + user.user._id)
        .then(res => {
            setProblems(res.data);
        });
    }, []);

    function handleRole() {
        if (user.user.role == "Student")
            return "";
        return (
            <div className = "mp-change-container">
                <Button href="/createprob" className="mp-create-btn">
                    Create
                </Button>
                <Button href = "/problemset" className = "mp-my-btn">
                    Problemset
                </Button>
            </div>
        )
    }
    return (
        <div className = "mp-parent">
            <Header/>
            <div className = "mp-body">
                <p className="mp-title">My Problems</p>
                {handleRole()}
                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th className="col-1">ID</th>
                            <th className="col-2">Name</th>
                            <th className="col-2">Tags</th>
                            <th className="col-1"></th>
                        </tr>
                    </thead>
                    <tbody>
                    {problems.map(p => {
                        return (
                            <ProbComp key = {p._id} p = {p} inExam = {false}/>
                        );
                    })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}