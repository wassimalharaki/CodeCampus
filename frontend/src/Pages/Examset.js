import Header from "../Components/Header";
import './Examset.css';
import { useSelector } from 'react-redux';
import { currentUser } from '../Store/UserSlice';
import { Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import ExamComp from "../Components/ExamComp";

export default function Examset() {
    const user = useSelector(currentUser);
    const [exams, setExams] = useState([]);
    
    useEffect(() => {
        if (user.user.role == "Student") {
            axios.post('http://localhost:3001/api/exam/for', {
                "email": user.user.email
            }).then(res => {
                setExams(res.data);
            });
        }
        else if (user.user.role == "Instructor") {
            axios.post('http://localhost:3001/api/exam/by', {
                "user_id": user.user._id
            }).then(res => {
                setExams(res.data);
            });
        }
        else {
            axios.get('http://localhost:3001/api/exam/')
            .then(res => {
                setExams(res.data);
            });
        }
    }, []);

    function handleRole() {
        if (user.user.role == "Student")
            return "";
        return (
            <Button href="/createexam" className="es-create-btn">
                Create
            </Button>
        )
    }
    
    return (
        <div className = "es-parent">
            <Header/>
            <div className = "es-body">
                <p className = "es-title">Examset</p>
                {handleRole()}
                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th className="col-1">Name</th>
                            <th className="col-1">Start Time</th>
                            <th className="col-1">End Time</th>
                            <th className="col-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                    {exams.map(e => {
                        return (
                            <ExamComp key = {e._id} e = {e}/>
                        );
                    })}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}