import Header from "../Components/Header";
import './Results.css';
import { Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Results() {
    const [problems, setProblems] = useState([]);
    const [exam, setExam] = useState({});
    const [scores, setScores] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const e_id = location.pathname.split("/")[2];
        axios.post('http://localhost:3001/api/exam/probs', {
            "id": e_id
        }).then(res => {
            setProblems(res.data);
        });

        axios.get('http://localhost:3001/api/exam/' + e_id)
        .then(res => {
            setExam(res.data);
        });
        
        axios.post('http://localhost:3001/api/exam/results', {
            "id": e_id
        }).then(res => {
            setScores(res.data);
        });
    }, []);

    function handleView(email) {
        navigate("/examstdsubs", {state: {
            email: email,
            start_time: exam.start_time,
            end_time: exam.end_time
        }});
    }

    return (
        <div className = "rs-parent">
            <Header/>
            <div className = "rs-body">
                <p className = "rs-title">{exam.name + " Results"}</p>
                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th className="col-2">Email</th>
                            {problems.map(p => {
                                return (
                                    <th className="col-1">{p.name}</th>
                                );
                            })}
                            <th className="col-1">Total</th>
                            <th className="col-1">Submissions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.map(s => {
                            return (
                                <tr>
                                    <td>{s.email}</td>
                                    {problems.map(p => {
                                        return (
                                            <td className = "rs-result" style={{color: (s[p.id].score == s[p.id].total ? 'green' : 'red')}}>{s[p.id].score + "/" + s[p.id].total}</td>
                                        );
                                    })}
                                    <td className = "rs-result" style={{color: (s.grand_score == s.grand_total ? 'green' : 'red')}}>{s.grand_score + "/" + s.grand_total}</td>
                                    <td className = "rs-view-cont"><Button onClick={() => handleView(s.email)}>View</Button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}