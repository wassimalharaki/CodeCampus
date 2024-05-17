import Header from "../Components/Header";
import "./MySubmissions.css"
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import SubmissionComp from "../Components/SubmissionComp";

export default function MySubmissions({email}) {
    const [subs, setSubs] = useState([]);
    
    useEffect(() => {
        axios.post('http://localhost:3001/api/submission/byemail', {
            "user_email": email,  
        }).then(res => {
            setSubs(res.data);
        });
    }, []);

    return (
        <div className = "ms-parent">
            <Header/>
            <div className = "ms-body">
                <p className="ms-title">My Submissions</p>
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