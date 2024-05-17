import Header from "../Components/Header";
import './Exam.css';
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import ProbComp from "../Components/ProbComp";

export default function Exam() {
    const [problems, setProblems] = useState([]);
    const [exam, setExam] = useState({});

    const e_id = location.pathname.split("/")[2];
    useEffect(() => {
        axios.post('http://localhost:3001/api/exam/probs', {
            "id": e_id
        }).then(res => {
            setProblems(res.data);
        });

        axios.get('http://localhost:3001/api/exam/' + e_id)
        .then(res => {
            setExam(res.data);
        });
    }, []);

    return (
        <div className = "ex-parent">
            <Header/>
            <div className = "ex-body">
                <p className = "ex-title">{exam.name}</p>
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
                            <ProbComp key = {p._id} p = {p} inExam = {true}/>
                        );
                    })}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}