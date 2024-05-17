import Header from "../Components/Header";
import { useSelector } from 'react-redux';
import { currentUser } from '../Store/UserSlice';
import "./Problemset.css"
import { Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import ProbComp from "../Components/ProbComp";

export default function Problemset() {
    const user = useSelector(currentUser);
    const [problems, setProblems] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/api/problem/')
        .then(res => {
            setProblems(res.data);
        });
    }, []);

    function handleRole() {
        if (user.user.role == "Student")
            return "";
        return (
            <div className = "ps-change-container">
                <Button href="/createprob" className="ps-create-btn">
                    Create
                </Button>
                <Button href="/myprobs" className = "ps-my-btn">
                    My Problems
                </Button>
            </div>
        )
    }
    return (
        <div className = "ps-parent">
            <Header/>
            <div className = "ps-body">
                <p className="ps-title">Problemset</p>

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