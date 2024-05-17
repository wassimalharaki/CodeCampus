import Header from "../Components/Header";
import "./Users.css"
import { Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import UserComp from "../Components/UserComp";

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/user/')
        .then(res => {
            setUsers(res.data);
        });
    }, []);

    return (
        <div className = "us-parent">
            <Header/>
            <div className = "us-body">
                <p className="us-title">Users</p>
                <div className = "us-change-container">
                    <Button href="/adduser" className="us-create-btn">
                        Add User
                    </Button>
                </div>
                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th className="col-1">Email</th>
                            <th className="col-1">Role</th>
                            <th className="col-1"></th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map(u => {
                        return (
                            <UserComp key = {u._id} u = {u}/>
                        );
                    })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}