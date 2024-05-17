import Header from "../Components/Header";
import "./ExamStudentSubmissions.css"
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import SubmissionComp from "../Components/SubmissionComp";
import { useLocation } from "react-router";

export default function ExamStudentSubmissions() {
    const [subs, setSubs] = useState([]);
    
    const state = useLocation();
    const email = state.state.email;
    const start_time = state.state.start_time;
    const end_time = state.state.end_time;

    useEffect(() => {
        axios.post('http://localhost:3001/api/submission/forexam', {
            "user_email": email,
            "start_time": start_time,
            "end_time": end_time
        }).then(res => {
            setSubs(res.data);
        });
    }, []);

    return (
        <div className = "ess-parent">
            <Header/>
            <div className = "ess-body">
                <p className="ess-title">My Submissions</p>
                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th className="col-1">User</th>
                            <th className="col-2">Problem</th>
                            <th className="col-2">Result</th>
                            <th className="col-1"></th>
                        </tr>
                    </thead>
                    <tbody>
                    {subs.map(s => {
                        return (
                            <SubmissionComp key = {s._id} s = {s}/>
                        );
                    })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}